import React, { HTMLProps, useRef, useState } from 'react';

import { getFixedColorClasses } from '../../utils';

interface InlineTooltipProps extends HTMLProps<HTMLSpanElement> {
    id: string;
    title: string;
    triggerRef: React.RefObject<HTMLElement>;
}

export const InlineTooltip = ({ id, title, triggerRef }: InlineTooltipProps) => {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
    const floatingRef = useRef<HTMLDivElement>(null);
    const { bgInverseSurface, textInverseOnSurface } = getFixedColorClasses();

    const style: React.CSSProperties = {
        position: 'absolute',
        top: coords?.y ?? -9999,
        left: coords?.x ?? -9999,
        zIndex: 1000,
        opacity: coords ? 1 : 0,
        pointerEvents: coords ? 'auto' : 'none',
    };

    const classes = [
        bgInverseSurface,
        textInverseOnSurface,
        'uui-tooltip',
        'uui-font-body-small',
        'uui-elevation-2',
        'uui-px-2',
        'uui-py-1',
        'uui-corner-small',
    ].join(' ');

    return (
        <div className={classes} id={id} ref={floatingRef} role="tooltip" style={style}>
            {title}
        </div>
    );
};

InlineTooltip.displayName = 'InlineTooltip';
