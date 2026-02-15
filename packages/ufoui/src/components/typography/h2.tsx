import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from '../base/textBase/textBase';

/**
 * Props for H2.
 * Extends TextBaseProps except component.
 *
 * @category Typography
 */
export type H2Props = Omit<TextBaseProps, 'component'>;

/**
 * H2 semantic heading.
 * Renders native h2 element with default headlineMedium font.
 *
 * @function
 * @param props - Typography props.
 *
 * @category Typography
 */
export const H2 = forwardRef<HTMLElement, H2Props>(
  ({ font = 'headlineMedium', ...props }, ref) => (
    <TextBase
      ref={ref}
      {...props}
      component="h2"
      elementClass="uui-h2"
      font={font}
    />
  ),
);

H2.displayName = 'H2';
