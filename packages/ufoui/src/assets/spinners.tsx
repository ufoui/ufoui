import React from 'react';

/** Generic SVG props used by spinner assets. */
type SvgProps = React.ComponentPropsWithoutRef<'svg'>;
/** Circle-specific SVG props for spinner ring parts. */
type CircleProps = React.ComponentPropsWithoutRef<'circle'>;

const steps = (count: number) => [...Array(count).keys()];
const step = (i: number) => ({ '--i': i }) as React.CSSProperties;

/**
 * Props for {@link SpinnerRingSvg}.
 *
 * @category Assets
 */
interface SpinnerRingSvgProps extends SvgProps {
    /** Props forwarded to the ring track circle element. */
    trackProps?: CircleProps;
    /** Props forwarded to the ring indicator circle element. */
    indicatorProps?: CircleProps;
}

/**
 * Ring spinner SVG asset.
 *
 * @category Assets
 * @function
 * @param props - SVG props including optional `trackProps` and `indicatorProps`.
 * @param props.trackProps - Props forwarded to the track `<circle>`.
 * @param props.indicatorProps - Props forwarded to the indicator `<circle>`.
 *
 * @example
 * <SpinnerRingSvg className="uui-spinner" />
 */

export const SpinnerRingSvg = ({ trackProps, indicatorProps, ...props }: SpinnerRingSvgProps) => (
    <svg fill="none" viewBox="0 0 40 40" {...props}>
        <circle className="uui-spinner-ring-track" cx="20" cy="20" r="18" strokeWidth="4" {...trackProps} />
        <circle className="uui-spinner-ring-indicator" cx="20" cy="20" r="18" strokeWidth="4" {...indicatorProps} />
    </svg>
);

/**
 * Three-dots spinner SVG asset.
 *
 * @category Assets
 * @function
 * @param props - Standard SVG props.
 */
export const SpinnerDotsSvg = (props: SvgProps) => (
    <svg viewBox="0 0 48 48" {...props}>
        {steps(3).map(i => (
            <circle cx={10 + i * 14} cy="24" key={i} r="4" style={step(i)} />
        ))}
    </svg>
);

/**
 * Blade-style spinner SVG asset.
 *
 * @category Assets
 * @function
 * @param props - Standard SVG props.
 */
export const SpinnerBladeSvg = (props: SvgProps) => (
    <svg viewBox="0 0 48 48" {...props}>
        {steps(8).map(i => (
            <rect height="12" key={i} rx="2" style={step(i)} transform={`rotate(${i * 45} 24 24)`} width="4" x="22" />
        ))}
    </svg>
);

/**
 * Vertical-bars spinner SVG asset.
 *
 * @category Assets
 * @function
 * @param props - Standard SVG props.
 */
export const SpinnerBarsSvg = (props: SvgProps) => (
    <svg viewBox="0 0 48 48" {...props}>
        <rect height="14" rx="2" width="6" x="6" y="17" />
        <rect height="22" rx="2" width="6" x="16" y="13" />
        <rect height="30" rx="2" width="6" x="26" y="9" />
        <rect height="20" rx="2" width="6" x="36" y="14" />
    </svg>
);

/**
 * Orbit spinner SVG asset.
 *
 * @category Assets
 * @function
 * @param props - Standard SVG props.
 */
export const SpinnerOrbitSvg = (props: SvgProps) => (
    <svg viewBox="0 0 48 48" {...props}>
        {steps(8).map(i => (
            <circle cx="24" cy="4" key={i} r="4" style={step(i)} transform={`rotate(${i * 45} 24 24)`} />
        ))}
    </svg>
);

/**
 * Arc spinner SVG asset.
 *
 * @category Assets
 * @function
 * @param props - Standard SVG props.
 */
export const SpinnerArcSvg = (props: SvgProps) => (
    <svg fill="none" viewBox="0 0 56 56" {...props}>
        <circle cx="28" cy="28" opacity="0.25" r="22" stroke="currentColor" strokeWidth="6" />
        <circle cx="28" cy="28" r="22" stroke="currentColor" strokeDasharray="69 69" strokeWidth="6" />
    </svg>
);

/**
 * Step-bar spinner SVG asset.
 *
 * @category Assets
 * @function
 * @param props - Standard SVG props.
 */
export const SpinnerStepBarSvg = (props: SvgProps) => (
    <svg viewBox="0 0 48 48" {...props}>
        {steps(3).map(i => (
            <rect height="8" key={i} rx="4" style={step(i)} width="8" x={6 + i * 14} y="20" />
        ))}
    </svg>
);

/**
 * Dual-ring spinner SVG asset.
 *
 * @category Assets
 * @function
 * @param props - Standard SVG props.
 */
export const SpinnerDualRingSvg = (props: SvgProps) => (
    <svg fill="none" viewBox="0 0 56 56" {...props}>
        <circle cx="28" cy="28" r="23" strokeWidth="6" />
        <circle cx="28" cy="28" r="14" strokeWidth="5" />
    </svg>
);
