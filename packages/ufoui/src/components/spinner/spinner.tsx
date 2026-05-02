import React from 'react';

import {
    SpinnerArcSvg,
    SpinnerBarsSvg,
    SpinnerBladeSvg,
    SpinnerDotsSvg,
    SpinnerDualRingSvg,
    SpinnerOrbitSvg,
    SpinnerRingSvg,
    SpinnerStepBarSvg,
} from '../../assets';
import { BaseColor, cn, ControlStyle, ElementSize, getSizeClass, toKebabCase } from '../../utils';

export type SpinnerVariant = 'ring' | 'dots' | 'blade' | 'bars' | 'orbit' | 'arc' | 'stepBar' | 'dualRing';

/**
 * Props for the spinner component.
 *
 * @category Spinner
 */
export interface SpinnerProps {
    /** Visual spinner variant. */
    variant?: SpinnerVariant;
    /** Semantic color token applied to the spinner. */
    color?: BaseColor;
    /** Size token controlling spinner dimensions. */
    size?: ElementSize;
    /** Additional class names for the root svg element. */
    className?: string;
    /** Applies inline alignment (`vertical-align: middle`) for text-flow usage. */
    inline?: boolean;
    /** Accessible label. When provided, spinner is announced as a status. */
    ariaLabel?: string;
}

const spinnerVariantMap = {
    ring: SpinnerRingSvg,
    dots: SpinnerDotsSvg,
    blade: SpinnerBladeSvg,
    bars: SpinnerBarsSvg,
    orbit: SpinnerOrbitSvg,
    arc: SpinnerArcSvg,
    stepBar: SpinnerStepBarSvg,
    dualRing: SpinnerDualRingSvg,
} satisfies Record<SpinnerVariant, React.ComponentType<React.ComponentPropsWithoutRef<'svg'>>>;

/**
 * Renders a loading spinner in one of the supported variants.
 *
 * By default spinner is decorative. Provide `ariaLabel` to expose it as an accessible status.
 *
 * @function Spinner
 * @param props Component properties.
 *
 * @category Spinner
 */
export const Spinner = ({ variant = 'ring', color, size, inline, className, ariaLabel }: SpinnerProps) => {
    const classes = cn(
        className,
        'uui-spinner',
        `uui-spinner-${toKebabCase(variant)}`,
        getSizeClass(size),
        inline && 'uui-spinner-inline'
    );
    const style = ControlStyle();
    style.text(color);
    const SvgComponent = spinnerVariantMap[variant];
    const accessibilityProps = ariaLabel
        ? ({ role: 'status', 'aria-live': 'polite', 'aria-label': ariaLabel } as const)
        : ({ 'aria-hidden': true } as const);

    return <SvgComponent className={classes} style={style.get()} {...accessibilityProps} />;
};
