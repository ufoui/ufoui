import React, { HTMLProps, ReactElement, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { calculateFloatingPosition, ControlStyle, ElementAlign } from '../../utils';

interface InlineTooltipManagerProps extends HTMLProps<HTMLSpanElement> {
    triggerRef: React.RefObject<HTMLElement>;
    tooltip: ReactElement;
    align: ElementAlign;
}

export const InlineTooltipManager = ({ tooltip, align, triggerRef }: InlineTooltipManagerProps) => {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
    const floatingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = triggerRef.current;
        if (!node) {
            return;
        }

        const show = () => {
            setOpen(true);
        };
        const hide = () => {
            setOpen(false);
            setCoords(null);
        };

        const showOnFocus = (e: FocusEvent) => {
            if ((e.target as HTMLElement).matches(':focus-visible')) {
                setOpen(true);
            }
        };

        node.addEventListener('mouseenter', show);
        node.addEventListener('mouseleave', hide);
        node.addEventListener('focus', showOnFocus);
        node.addEventListener('blur', hide);

        return () => {
            node.removeEventListener('mouseenter', show);
            node.removeEventListener('mouseleave', hide);
            node.removeEventListener('focus', showOnFocus);
            node.removeEventListener('blur', hide);
        };
    }, [triggerRef]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const frame = requestAnimationFrame(() => {
            if (!floatingRef.current || !triggerRef.current) {
                return;
            }

            const result = calculateFloatingPosition(triggerRef, floatingRef, {
                placement: align,
                offset: 8,
            });

            if (result) {
                setCoords({ x: result.x, y: result.y });
            }
        });

        return () => {
            cancelAnimationFrame(frame);
        };
    }, [align, open, triggerRef]);

    const s = ControlStyle({
        top: coords?.y ?? -9999,
        left: coords?.x ?? -9999,
        opacity: coords ? 1 : 0,
        visibility: coords && open ? 'visible' : 'hidden',
    });
    const classes = ['uui-tooltip', 'uui-font-body-small', 'uui-elevation-2', 'uui-corner-small'].join(' ');

    return createPortal(
        <div className={classes} ref={floatingRef} role="tooltip" style={s.get()}>
            {tooltip}
        </div>,
        document.body
    );
};

InlineTooltipManager.displayName = 'InlineTooltipManager';
