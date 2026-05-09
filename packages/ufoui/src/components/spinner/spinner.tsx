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
import {
    BaseColor,
    cn,
    ControlStyle,
    ElementSize,
    getSizeClass,
    getWrapperStyle,
    toKebabCase,
    WrapperProps,
} from '../../utils';

export type SpinnerVariant = 'ring' | 'dots' | 'blade' | 'bars' | 'orbit' | 'arc' | 'stepBar' | 'dualRing';

/**
 * Props for the spinner component.
 *
 * @remarks
 * Supports wrapper-level spacing and positioning props from {@link WrapperProps}
 * such as `m`, `mx`, `my`, `top`, `left`, `position`, and `zIndex`.
 *
 * @category Spinner
 */
export interface SpinnerProps extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'color' | 'children'>, WrapperProps {
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
    /** When true, spinner ignores token-based sizing and fills its container (`width/height: 100%`). */
    fluid?: boolean;
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
 * @example
 * <Spinner />
 *
 * @example
 * <Spinner variant="dots" size="medium" color="primary" />
 *
 * @example
 * <Spinner position="absolute" top={8} right={8} />
 *
 * @category Spinner
 */
export const Spinner = ({
    variant = 'ring',
    fluid = false,
    color,
    size = 'medium',
    inline,
    className,
    ariaLabel,
    style,
    ...rest
}: SpinnerProps) => {
    const classes = cn(
        className,
        'uui-spinner',
        `uui-spinner-${toKebabCase(variant)}`,
        !fluid && getSizeClass(size),
        inline && 'uui-spinner-inline'
    );
    const { wrapperStyle, otherProps } = getWrapperStyle(rest);
    const controlStyle = ControlStyle(wrapperStyle);
    controlStyle.text(color);
    controlStyle.merge(style);
    const SvgComponent = spinnerVariantMap[variant];
    const accessibilityProps = ariaLabel
        ? ({ role: 'status', 'aria-live': 'polite', 'aria-label': ariaLabel } as const)
        : ({ 'aria-hidden': true } as const);

    return <SvgComponent className={classes} style={controlStyle.get()} {...otherProps} {...accessibilityProps} />;
};
