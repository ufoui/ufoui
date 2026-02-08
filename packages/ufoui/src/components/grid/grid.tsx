import { forwardRef } from 'react';

import { BoxBase, BoxBaseProps } from '@ufoui/core';

/**
 * Props for the {@link Grid} component.
 *
 * Extends {@link BoxBaseProps} with flex-related props removed.
 * Intended for CSS Grid–only layouts.
 *
 * @category Grid
 */
export type GridProps = Omit<
  BoxBaseProps,
  'elementClass' | 'type' | 'direction' | 'wrap'
>;

/**
 * Grid layout container.
 *
 * Explicit CSS Grid wrapper used for two-dimensional layouts.
 * Use this component when working with grid semantics such as
 * columns, rows, gaps, and auto-placement flow.
 *
 * Built on top of {@link BoxBase} and exposes only grid-relevant layout props.
 *
 * @category Grid
 * @function
 * @param props - Grid layout props inherited from {@link BoxBase}.
 *
 * @example
 * <Grid cols={3} gap={16}>
 *   <Item />
 *   <Item />
 *   <Item />
 * </Grid>
 *
 * @example
 * <Grid rows="auto 1fr auto" gapY={8}>
 *   <Header />
 *   <Content />
 *   <Footer />
 * </Grid>
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  return <BoxBase {...props} ref={ref} type="grid" />;
});

Grid.displayName = 'Grid';
