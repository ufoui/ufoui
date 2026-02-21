import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from '../base/textBase';

/**
 * Props for Label.
 * Extends TextBaseProps except component.
 *
 * @category Typography
 */
export type LabelProps = Omit<TextBaseProps, 'component'>;

/**
 * Label semantic text.
 * Renders native label element with default labelLarge font.
 *
 * @function
 * @param props - Typography props.
 *
 * @category Typography
 */
export const Label = forwardRef<HTMLElement, LabelProps>(
  ({ font = 'labelLarge', ...props }, ref) => (
    <TextBase
      ref={ref}
      {...props}
      component="label"
      elementClass="uui-label"
      font={font}
    />
  ),
);

Label.displayName = 'Label';
