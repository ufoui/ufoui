import React from 'react';

type SvgProps = React.ComponentPropsWithoutRef<'svg'>;
type CircleProps = React.ComponentPropsWithoutRef<'circle'>;

interface SpinnerRingSvgProps extends SvgProps {
    trackProps?: CircleProps;
    indicatorProps?: CircleProps;
}

export const SpinnerRingSvg = ({ trackProps, indicatorProps, ...props }: SpinnerRingSvgProps) => (
    <svg fill="none" viewBox="0 0 40 40" {...props}>
        <circle className="uui-spinner-ring-track" cx="20" cy="20" fill="none" r="18" strokeWidth="4" {...trackProps} />
        <circle
            className="uui-spinner-ring-indicator"
            cx="20"
            cy="20"
            fill="none"
            r="18"
            strokeWidth="4"
            {...indicatorProps}
        />
    </svg>
);

export const SpinnerDotsSvg = (props: SvgProps) => (
    <svg viewBox="0 0 48 48" {...props}>
        <circle cx="10" cy="24" r="4" />
        <circle cx="24" cy="24" r="4" />
        <circle cx="38" cy="24" r="4" />
    </svg>
);

export const SpinnerBladeSvg = (props: SvgProps) => (
    <svg viewBox="0 0 48 48" {...props}>
        <rect height="12" rx="2" width="4" x="22" />
        <rect height="12" rx="2" transform="rotate(-135 33.9 16.9)" width="4" x="33.9" y="16.9" />
        <rect height="12" rx="2" transform="rotate(-90 36 26)" width="4" x="36" y="26" />
        <rect height="12" rx="2" transform="rotate(-45 31.1 33.9)" width="4" x="31.1" y="33.9" />
        <rect height="12" rx="2" width="4" x="22" y="36" />
        <rect height="12" rx="2" transform="rotate(-135 8.4 42.4)" width="4" x="8.4" y="42.4" />
        <rect height="12" rx="2" transform="rotate(-90 0 26)" width="4" y="26" />
        <rect height="12" rx="2" transform="rotate(-45 5.6 8.4)" width="4" x="5.6" y="8.4" />
    </svg>
);

export const SpinnerBarsSvg = (props: SvgProps) => (
    <svg viewBox="0 0 48 48" {...props}>
        <rect height="14" rx="2" width="6" x="6" y="17" />
        <rect height="22" rx="2" width="6" x="16" y="13" />
        <rect height="30" rx="2" width="6" x="26" y="9" />
        <rect height="20" rx="2" width="6" x="36" y="14" />
    </svg>
);

export const SpinnerOrbitSvg = (props: SvgProps) => (
    <svg viewBox="0 0 48 48" {...props}>
        <circle cx="24" cy="4" r="4" />
        <circle cx="38.1421" cy="9.8579" r="4" />
        <circle cx="44" cy="24" r="4" />
        <circle cx="38.1421" cy="38.1421" r="4" />
        <circle cx="24" cy="44" r="4" />
        <circle cx="9.8579" cy="38.1421" r="4" />
        <circle cx="4" cy="24" r="4" />
        <circle cx="9.8579" cy="9.8579" r="4" />
    </svg>
);

export const SpinnerArcSvg = (props: SvgProps) => (
    <svg fill="none" viewBox="0 0 56 56" {...props}>
        <circle cx="28" cy="28" fill="none" opacity="0.25" r="22" stroke="currentColor" strokeWidth="6" />
        <circle
            cx="28"
            cy="28"
            fill="none"
            r="22"
            stroke="currentColor"
            strokeDasharray="69 69"
            strokeDashoffset="0"
            strokeLinecap="butt"
            strokeWidth="6"
        />
    </svg>
);

export const SpinnerStepBarSvg = (props: SvgProps) => (
    <svg viewBox="0 0 48 48" {...props}>
        <rect height="8" rx="4" width="8" x="6" y="20" />
        <rect height="8" rx="4" width="8" x="20" y="20" />
        <rect height="8" rx="4" width="8" x="34" y="20" />
    </svg>
);

export const SpinnerDualRingSvg = (props: SvgProps) => (
    <svg fill="none" viewBox="0 0 56 56" {...props}>
        <circle cx="28" cy="28" fill="none" r="23" strokeWidth="6" />
        <circle cx="28" cy="28" fill="none" r="14" strokeWidth="5" />
    </svg>
);
