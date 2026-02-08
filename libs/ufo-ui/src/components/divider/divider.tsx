import { HTMLProps, useLayoutEffect, useRef, useState } from 'react';

import {
    BorderColor,
    ControlStyle,
    ElementBorder,
    ElementElevation,
    ElementInset,
    ElementShape,
    getBorderClass,
    getBorderColor,
    getElevationClass,
    getShapeClass,
} from '@ufoui/core';
import { IS_DIVIDER } from './divider.guards';


/**
 * Props for the {@link Divider} component.
 *
 * @category Divider
 */
export interface DividerProps extends Omit<HTMLProps<HTMLDivElement>, 'ref'> {
    /** Line color token used for the divider. */
    borderColor?: BorderColor;

    /** Alias for `borderColor`. */
    color?: BorderColor;

    /** Divider thickness (0–4). Default: 1 */
    border?: ElementBorder;

    /** If true, renders divider vertically. */
    vertical?: boolean;

    /** Inset alignment mode (`left`, `right`, `top`, `bottom`, `middle`). */
    inset?: ElementInset;

    /** Offset applied for inset margins. */
    insetSize?: number;

    /** Spacing around the divider in px. Default: 8. */
    spacing?: number;

    /** Opacity preset applied to the divider. */
    variant?: 'subtle' | 'medium' | 'strong';

    /** Elevation level applied to the divider. */
    elevation?: ElementElevation;

    /** Corner shape applied to the divider. */
    shape?: ElementShape;

    /** Height of a vertical divider in inline and flex-column layouts. */
    height?: string;
}

/**
 * **Divider** - thin line used to separate content.
 *
 * Supports horizontal and vertical orientation, thickness, spacing,
 * inset offsets, color tokens, opacity presets, elevation and corner shapes
 *
 * @param props
 * @function
 * @example
 * ```tsx
 * <Divider spacing={12} variant="subtle" />
 * ```
 *
 * @example
 * ```tsx
 * <Divider vertical inset="middle" insetWidth={24} />
 * ```
 *
 * @category Divider
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export const Divider = (props: DividerProps) => {
    const {
        className,
        borderColor,
        color,
        border = 1,
        inset = 'none',
        insetSize = 16,
        spacing = 8,
        vertical,
        variant = 'strong',
        elevation,
        shape,
        style,
        height,
        ...rawProps
    } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [isFlexParent, setIsFlexParent] = useState(false);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el?.parentElement) {
            return;
        }

        const parentDisplay = getComputedStyle(el.parentElement).display;
        setIsFlexParent(parentDisplay.includes('flex'));
    }, []);

    const borderWidth = Math.min(4, Math.max(0, border)) as ElementBorder;

    const dividerClass = [
        'uui-divider',
        getBorderClass(borderWidth === 0 ? 0 : 1),
        className,
        elevation && getElevationClass(elevation),
        shape && getShapeClass(shape),
    ]
        .filter(Boolean)
        .join(' ');

    const controlStyle = ControlStyle(style);
    const lineColor = getBorderColor(borderColor ?? color ?? 'outlineVariant');
    controlStyle.border(lineColor);
    controlStyle.bg(lineColor);

    if (variant !== 'strong') {
        if (variant === 'subtle') {
            controlStyle.set('opacity', 'var(--uui-subtle-opacity)');
        } else {
            controlStyle.set('opacity', 'var(--uui-medium-opacity)');
        }
    }

    if (isFlexParent) {
        if (vertical) {
            controlStyle.merge({
                height: height,
                alignSelf: 'stretch',
                width: `${borderWidth}px`,
                marginInline: `${spacing}px`,
            });
        } else {
            controlStyle.merge({ flex: '1 1 auto', height: `${borderWidth}px`, marginBlock: `${spacing}px` });
        }
    } else if (vertical) {
        controlStyle.merge({
            height: height,
            display: 'inline-block',
            verticalAlign: 'middle',
            width: `${borderWidth}px`,
            marginInline: `${spacing}px`,
        });
    } else {
        controlStyle.merge({
            height: `${borderWidth}px`,
            marginBlock: `${spacing}px`,
        });
    }

    if (inset !== 'none') {
        const insetStart = inset === 'left' || inset === 'top' || inset === 'middle';
        const insetEnd = inset === 'right' || inset === 'bottom' || inset === 'middle';
        if (insetStart) {
            if (vertical) {
                controlStyle.set('marginBlockStart', `${insetSize}px`);
            } else {
                controlStyle.set('marginInlineStart', `${insetSize}px`);
            }
        }
        if (insetEnd) {
            if (vertical) {
                controlStyle.set('marginBlockEnd', `${insetSize}px`);
            } else {
                controlStyle.set('marginInlineEnd', `${insetSize}px`);
            }
        }
    }
    return (
        <div
            aria-hidden="true"
            className={dividerClass}
            ref={ref}
            role="separator"
            style={controlStyle.get()}
            {...rawProps}
        />
    );
};

/**
 * Marks this component as a Divider for runtime type guards.
 *
 * Used internally to identify Divider elements via a shared Symbol.
 * Not part of the public API.
 *
 * @internal
 */
Divider[IS_DIVIDER] = true;
/**
 * Display name used by React DevTools.
 *
 * @internal
 */
Divider.displayName = 'Divider';
