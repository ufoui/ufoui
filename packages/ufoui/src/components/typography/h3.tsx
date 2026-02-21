import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from '../base/textBase';

/**
 * Props for H3.
 * Extends TextBaseProps except component.
 *
 * @category Typography
 */
export type H3Props = Omit<TextBaseProps, 'component'>;

/**
 * H3 semantic heading.
 * Renders native h3 element with default headlineSmall font.
 *
 * @function
 * @param props - Typography props.
 *
 * @category Typography
 */
export const H3 = forwardRef<HTMLElement, H3Props>(
  ({ font = 'headlineSmall', ...props }, ref) => (
    <TextBase
      ref={ref}
      {...props}
      component="h3"
      elementClass="uui-h3"
      font={font}
    />
  ),
);

H3.displayName = 'H3';
