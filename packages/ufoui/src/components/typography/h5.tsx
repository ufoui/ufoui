import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from '../base/textBase/textBase';

/**
 * Props for H5.
 * Extends TextBaseProps except component.
 *
 * @category Typography
 */
export type H5Props = Omit<TextBaseProps, 'component'>;

/**
 * H5 semantic heading.
 * Renders native h5 element with default titleMedium font.
 *
 * @function
 * @param props - Typography props.
 *
 * @category Typography
 */
export const H5 = forwardRef<HTMLElement, H5Props>(
  ({ font = 'titleMedium', ...props }, ref) => (
    <TextBase
      ref={ref}
      {...props}
      component="h5"
      elementClass="uui-h5"
      font={font}
    />
  ),
);

H5.displayName = 'H5';
