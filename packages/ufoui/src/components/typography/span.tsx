import { forwardRef } from 'react';

import { TextBase, TextBaseProps } from '../base/textBase';

/**
 * Props for Span.
 * Extends TextBaseProps except component.
 *
 * @category Typography
 */
export type SpanProps = Omit<TextBaseProps, 'component'>;

/**
 * Span semantic inline text wrapper.
 * Renders native span element.
 *
 * @function
 * @param props - Typography props.
 *
 * @category Typography
 */
export const Span = forwardRef<HTMLElement, SpanProps>((props, ref) => (
  <TextBase ref={ref} {...props} component="span" elementClass="uui-span" />
));

Span.displayName = 'Span';
