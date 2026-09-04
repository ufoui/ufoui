import { HTMLAttributes, ReactNode } from 'react';

import {
    cn,
    ControlStyle,
    ElementFont,
    ElementShape,
    ElementSize,
    getFontClass,
    getShapeClass,
    getSizeClass,
    getWrapperStyle,
    WrapperProps,
} from '../../utils';
import { BaseColor } from '../../types';
import { Leading, Trailing } from '../../internal';

/**
 * Props for the Status component.
 *
 * @category Status
 */
export interface StatusProps extends WrapperProps, Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'children'> {
    /** Text label describing the entity state. */
    label: string;

    /**
     * Background color role. The text color is resolved to its `on*` counterpart.
     * When omitted renders in the `surfaceVariant` / `onSurfaceVariant` surface roles.
     */
    color?: BaseColor;

    /** Visual size of the pill. @default 'small' */
    size?: ElementSize;

    /** Shape of the pill. @default 'round' */
    shape?: ElementShape;

    /** Content rendered before the label (e.g. an icon). */
    leading?: ReactNode;

    /** Content rendered after the label (e.g. an icon). */
    trailing?: ReactNode;
}

const fontMap: Record<ElementSize, ElementFont> = {
    extraSmall: 'labelSmall',
    small: 'labelMedium',
    medium: 'labelLarge',
    large: 'titleSmall',
    extraLarge: 'titleMedium',
};

/**
 * Displays a standalone status pill for states, outcomes, or workflow labels.
 *
 * Purely presentational - no interaction, hover, focus, or ripple.
 * Accepts optional leading/trailing slots for icons or indicators.
 *
 * @remarks
 * Not an ARIA live region - the name refers to the entity state, not to the `status` role.
 * Set `role="status"` explicitly when the pill reports a change that should be announced.
 *
 * @function Status
 * @param props Component properties.
 *
 * @example
 * <Status label="Published" color="successContainer" />
 *
 * @example
 * <Status label="Pending" color="warningContainer" leading={<ClockIcon />} />
 *
 * @example
 * <Status label="Failed" color="error" trailing={<AlertIcon />} />
 *
 * @category Status
 */
export const Status = ({
    label,
    color,
    size = 'small',
    shape = 'round',
    leading,
    trailing,
    className,
    style,
    ...rest
}: StatusProps) => {
    const { wrapperStyle, otherProps } = getWrapperStyle(rest);
    const cs = ControlStyle(wrapperStyle);
    cs.merge(style);

    cs.bg(color);
    cs.text.on(color);

    const classes = cn('uui-status', getSizeClass(size), getShapeClass(shape), getFontClass(fontMap[size]), className);

    return (
        <span className={classes} style={cs.get()} {...otherProps}>
            <Leading content={leading} />
            <span className="uui-status-label">{label}</span>
            <Trailing content={trailing} />
        </span>
    );
};

Status.displayName = 'Status';
