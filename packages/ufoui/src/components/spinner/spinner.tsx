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

export interface SpinnerProps {
    variant?: SpinnerVariant;
    color?: BaseColor;
    size?: ElementSize;
    className?: string;
    inline?: boolean;
}

export function Spinner({ variant = 'ring', color, size, inline, className }: SpinnerProps) {
    const classes = cn(
        'uui-spinner',
        `uui-spinner-${toKebabCase(variant)}`,
        getSizeClass(size),
        inline && 'uui-spinner-inline',
        className
    );
    const style = ControlStyle();
    style.text(color);
    const spinnerStyle = style.get();
    if (variant === 'ring') {
        return <SpinnerRingSvg aria-hidden="true" className={classes} style={spinnerStyle} />;
    }

    if (variant === 'dots') {
        return <SpinnerDotsSvg className={classes} style={spinnerStyle} />;
    }

    if (variant === 'blade') {
        return <SpinnerBladeSvg className={classes} style={spinnerStyle} />;
    }

    if (variant === 'bars') {
        return <SpinnerBarsSvg className={classes} style={spinnerStyle} />;
    }

    if (variant === 'orbit') {
        return <SpinnerOrbitSvg className={classes} style={spinnerStyle} />;
    }

    if (variant === 'arc') {
        return <SpinnerArcSvg className={classes} style={spinnerStyle} />;
    }

    if (variant === 'stepBar') {
        return <SpinnerStepBarSvg className={classes} style={spinnerStyle} />;
    }

    if (variant === 'dualRing') {
        return <SpinnerDualRingSvg className={`${classes} uui-dual-ring-spinner`} style={spinnerStyle} />;
    }

    return null;
}
