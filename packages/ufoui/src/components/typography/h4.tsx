import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from '../base/textBase/textBase';

/**
 * Props for H4.
 * Extends TextBaseProps except component.
 *
 * @category Typography
 */
export type H4Props = Omit<TextBaseProps, 'component'>;

/**
 * H4 semantic heading.
 * Renders native h4 element with default titleLarge font.
 *
 * @function
 * @param props - Typography props.
 *
 * @category Typography
 */
export const H4 = forwardRef<HTMLElement, H4Props>(
  ({ font = 'titleLarge', ...props }, ref) => (
    <TextBase
      ref={ref}
      {...props}
      component="h4"
      elementClass="uui-h4"
      font={font}
    />
  ),
);

H4.displayName = 'H4';
