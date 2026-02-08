import { forwardRef, HTMLProps, ReactNode, useRef } from 'react';

import { ElementAlign } from '@ufoui/utils';

import { InlineTooltipManager } from '../../internal/inlineTooltip/inlineTooltipManager';

export interface TooltipProps extends HTMLProps<HTMLDivElement> {
  title: string;
  children?: ReactNode;
  align?: ElementAlign;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      className = '',
      title = '',
      align = 'topRight',
      value,
      ...props
    }: TooltipProps,
    ref,
  ) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const inlineTooltip = <div>{title}</div>;
    return (
      <span className="uui-tooltip" ref={ref} {...props}>
        <InlineTooltipManager
          align={align}
          tooltip={inlineTooltip}
          triggerRef={buttonRef}
        />
        <div ref={buttonRef}>{children}</div>
      </span>
    );
  },
);
Tooltip.displayName = 'Tooltip';
