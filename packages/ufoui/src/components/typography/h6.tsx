import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from '../base/textBase';

/**
 * Props for H6.
 * Extends TextBaseProps except for `as` and `elementClass`.
 *
 * @category Typography
 */
export type H6Props = Omit<TextBaseProps, 'as' | 'elementClass'>;

/**
 * H6 semantic heading.
 * Renders native h6 element with default titleSmall font.
 *
 * @function
 * @param props - Typography props.
 *
 * @category Typography
 */
export const H6 = forwardRef<HTMLElement, H6Props>(({ font = 'titleSmall', ...props }, ref) => (
    <TextBase ref={ref} {...props} as="h6" elementClass="uui-h6" font={font} />
));

H6.displayName = 'H6';
