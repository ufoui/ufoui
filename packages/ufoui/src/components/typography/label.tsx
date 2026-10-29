import { forwardRef, LabelHTMLAttributes } from 'react';

import { TextBase, TextBaseProps } from '../base';

/**
 * Props for Label.
 * Extends TextBaseProps except for `as` and `elementClass`, plus native `htmlFor`.
 *
 * @category Typography
 */
export type LabelProps = Omit<TextBaseProps, 'as' | 'elementClass'> &
    Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>;

/**
 * Label semantic text.
 * Renders native label element with default labelLarge font.
 *
 * @function
 * @param props - Typography props.
 *
 * @category Typography
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ font = 'labelLarge', ...props }, ref) => (
    <TextBase ref={ref} {...props} as="label" elementClass="uui-label" font={font} />
));

Label.displayName = 'Label';
