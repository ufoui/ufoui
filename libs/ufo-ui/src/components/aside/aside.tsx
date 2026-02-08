import { forwardRef } from 'react';

import { BoxBase, BoxBaseProps } from '@ufoui/core';

/**
 * Props for {@link Aside}.
 * Extends {@link BoxBaseProps} except for `elementClass` and `component`.
 *
 * @category Box
 */
export type AsideProps = Omit<BoxBaseProps, 'elementClass' | 'component'>;

/**
 * Semantic layout wrapper for the native `<aside>` element.
 *
 * Built on top of {@link BoxBase}, inheriting its layout and styling props.
 * Defaults to a column layout (`direction="col"`) and applies
 * the semantic UUI class `"uui-aside"`.
 *
 * Use for complementary or contextual content adjacent to the main content.
 *
 * @function
 * @param props - All layout and style props inherited from {@link BoxBase}.
 * @example
 * <Aside elevation={1} shape="rounded">
 *   <SidebarContent />
 * </Aside>
 *
 * @category Box
 */
export const Aside = forwardRef<HTMLElement, AsideProps>(({ direction = 'col', ...props }, ref) => {
    return <BoxBase ref={ref} {...props} component="aside" direction={direction} elementClass="uui-aside" />;
});

Aside.displayName = 'Aside';
