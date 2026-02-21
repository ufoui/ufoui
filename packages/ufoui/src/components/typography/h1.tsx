import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from '../base/textBase';

/**
 * Props for H1.
 * Extends TextBaseProps except component.
 *
 * @category Typography
 */
export type H1Props = Omit<TextBaseProps, 'component'>;

/**
 * H1 semantic heading.
 * Renders native h1 element with default headlineLarge font.
 *
 * @function
 * @param props - Typography props.
 *
 * @category Typography
 */
export const H1 = forwardRef<HTMLElement, H1Props>(
  ({ font = 'headlineLarge', ...props }, ref) => (
    <TextBase
      ref={ref}
      {...props}
      component="h1"
      elementClass="uui-h1"
      font={font}
    />
  ),
);

H1.displayName = 'H1';
