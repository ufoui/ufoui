import { HTMLAttributes, ReactNode } from 'react';

import { cn, ControlStyle, ElementFont, ElementSize, getFontClass, getSizeClass } from '../../utils';
import { SemanticColor } from '../../types';
import { Leading, Trailing } from '../../internal';

/**
 * Visual style variant of the Status pill.
 *
 * - `soft` — container tone (`{color}Container` bg, `on{color}Container` text). Default.
 * - `filled` — solid tone (`{color}` bg, `on{color}` text).
 *
 * @category Status
 */
export type StatusVariant = 'soft' | 'filled';

/**
 * Props for the Status component.
 *
 * @category Status
 */
export interface StatusProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
    /** Text label describing the entity state. */
    label: string;

    /** Semantic color. When omitted renders in the `surfaceVariant` / `onSurfaceVariant` surface roles. */
    color?: SemanticColor;

    /** Visual size of the pill. @default 'small' */
    size?: ElementSize;

    /** Color style variant. @default 'soft' */
    variant?: StatusVariant;

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
 * Purely presentational — no interaction, hover, focus, or ripple.
 * Accepts optional leading/trailing slots for icons or indicators.
 *
 * @function Status
 * @param props Component properties.
 *
 * @example
 * <Status label="Published" color="success" />
 *
 * @example
 * <Status label="Pending" color="warning" leading={<ClockIcon />} />
 *
 * @example
 * <Status label="Failed" color="error" variant="filled" trailing={<AlertIcon />} />
 *
 * @category Status
 */
export const Status = ({
    label,
    color,
    size = 'small',
    variant = 'soft',
    leading,
    trailing,
    className,
    style,
    ...rest
}: StatusProps) => {
    const cs = ControlStyle(style);

    if (color) {
        if (variant === 'filled') {
            cs.bg(color);
            cs.text.on(color);
        } else {
            cs.bg.container(color);
            cs.text.onContainer(color);
        }
    }

    const classes = cn('uui-status', getSizeClass(size), getFontClass(fontMap[size]), className);

    return (
        <span className={classes} style={cs.get()} {...rest}>
            <Leading content={leading} />
            <span className="uui-status-label">{label}</span>
            <Trailing content={trailing} />
        </span>
    );
};

Status.displayName = 'Status';
