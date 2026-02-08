import React, { HTMLProps, useRef } from 'react';

import { getFixedColorClasses } from '@ufoui/core';

interface InlineTooltipProps2 extends HTMLProps<HTMLSpanElement> {
    id: string;
    title: string;
}

export const InlineTooltip2 = ({ id, title }: InlineTooltipProps2) => {
    const floatingRef = useRef<HTMLDivElement>(null);
    const { bgInverseSurface, textInverseOnSurface } = getFixedColorClasses();

    const classes = [
        bgInverseSurface,
        textInverseOnSurface,
        'uui-tooltip',
        'uui-font-body-small',
        'uui-elevation-2',
        'uui-px-2',
        'uui-py-1',
        'uui-corner-small',
    ].join(' ');

    return (
        <div className={classes} id={id} ref={floatingRef} role="tooltip">
            {title}
        </div>
    );
};

InlineTooltip2.displayName = 'InlineTooltip';
