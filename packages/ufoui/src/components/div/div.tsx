import { forwardRef } from 'react';

import { BoxBase, BoxBaseProps } from '../base/boxBase/boxBase';

/**
 * Props for the {@link Div} component.
 *
 * Extends {@link BoxBaseProps} with all layout-related props removed.
 * Intended as a neutral block-level wrapper.
 *
 * @category Div
 */
export type DivProps = Omit<
  BoxBaseProps,
  'type' | 'direction' | 'flow' | 'cols' | 'rows' | 'wrap'
>;

/**
 * Generic block-level container.
 *
 * Renders a plain block element without imposing layout semantics.
 * Use this component when you need a structural wrapper for styling,
 * spacing, elevation, or surface color — but not layout.
 *
 * Built on top of {@link BoxBase} with `type="block"`.
 *
 * @category Div
 * @function
 * @param props - Block-level props inherited from {@link BoxBase}.
 *
 * @example
 * <Div p={16} elevation={1}>
 *   <Content />
 * </Div>
 */
export const Div = forwardRef<HTMLDivElement, DivProps>((props, ref) => {
  return <BoxBase {...props} ref={ref} type="block" />;
});

Div.displayName = 'Div';
