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
    cn,
    ControlStyle,
    ElementSize,
    getSizeClass,
    getWrapperStyle,
    TextColor,
    toKebabCase,
    WrapperProps,
} from '../../utils';

/**
 * Visual variant of the spinner.
 *
 * @category Spinner
 */
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
    /** Visual spinner variant. @default 'ring' */
    variant?: SpinnerVariant;
    /** Semantic color token applied to the spinner. */
    color?: TextColor;
    /** Size token controlling spinner dimensions. @default 'medium' */
    size?: ElementSize;
    /** Ignores token-based sizing and fills the container (`width/height: 100%`). @default false */
    stretch?: boolean;
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
 * By default spinner is decorative. Provide `aria-label` to expose it as an accessible status.
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
    stretch = false,
    color,
    size = 'medium',
    className,
    'aria-label': ariaLabel,
    style,
    ...rest
}: SpinnerProps) => {
    const classes = cn(
        className,
        'uui-spinner',
        `uui-spinner-${toKebabCase(variant)}`,
        !stretch && getSizeClass(size)
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
