import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from '../base/textBase';

/**
 * Props for P.
 * Extends TextBaseProps except component.
 *
 * @category Typography
 */
export type PProps = Omit<TextBaseProps, 'component'>;

/**
 * P semantic paragraph.
 * Renders native p element.
 *
 * @function
 * @param props - Typography props.
 *
 * @category Typography
 */
export const P = forwardRef<HTMLElement, PProps>((props, ref) => (
  <TextBase ref={ref} {...props} component="p" elementClass="uui-p" />
));

P.displayName = 'P';
