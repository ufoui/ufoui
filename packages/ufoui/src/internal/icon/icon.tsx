import { ReactNode } from 'react';

import { cn, ControlStyle, SurfaceColor } from '../../utils';

/**
 * Props for the {@link Icon} wrapper.
 *
 * @category Internal components
 */
export interface IconProps {
    /** Icon graphic or element rendered inside the wrapper. */
    icon: ReactNode;

    /** Additional class names merged with the base `uui-icon` token. */
    className?: string;

    /** Theme surface token as CSS `color` (for `currentColor` SVG). */
    color?: SurfaceColor;
}

/**
 * Renders icon content with the shared `uui-icon` layout class.
 *
 *
 * @function
 * @param props Component properties.
 *
 * @category Internal components
 */
export const Icon = ({ icon, className, color }: IconProps) => {
    const iconStyle = ControlStyle();
    iconStyle.text(color);
    return (
        <div className={cn('uui-icon', className)} style={iconStyle.get()}>
            {icon}
        </div>
    );
};

Icon.displayName = 'Icon';
