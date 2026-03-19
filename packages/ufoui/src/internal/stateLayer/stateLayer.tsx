import React from 'react';

import { cn, ControlStyle, SurfaceColor } from '../../utils';

/**
 * Props for StateLayer component.
 *
 * @category Internal components
 */
export interface StateLayerProps {
    /** Background color token. */
    color?: SurfaceColor;

    /** Additional class name. */
    className?: string;
}

/**
 * StateLayer component.
 *
 * Renders a visual state layer used for hover, focus, pressed and selected effects.
 *
 * @param color Background color token.
 * @param className Additional class name.
 *
 * @function
 *
 * @example
 * <Component>
 *   <StateLayer />
 * </Component>
 *
 * @example
 * <StateLayer color="primary" />
 *
 * @category Internal components
 */
export const StateLayer = ({ color, className }: StateLayerProps) => {
    const style = ControlStyle();
    style.bg(color);

    return <div className={cn('uui-state', className)} style={style.get()} />;
};
