import { forwardRef } from 'react';

import { BoxBase, BoxBaseProps } from '@ufoui/core';

/**
 * Props for {@link Section}.
 * Extends {@link BoxBaseProps} except for `elementClass` and `component`.
 *
 * @category Box
 */
export type SectionProps = Omit<BoxBaseProps, 'elementClass' | 'component'>;

/**
 * Semantic layout wrapper for the native `<section>` element.
 *
 * Built on top of {@link BoxBase}, inheriting its layout and styling props.
 * Defaults to a column layout (`direction="col"`) and applies
 * the semantic UUI class `"uui-section"`.
 *
 * Use for grouping related content within a document or page.
 *
 * @function
 * @param props - All layout and style props inherited from {@link BoxBase}.
 * @example
 * <Section elevation={1} shape="rounded">
 *   <Article />
 * </Section>
 *
 * @category Box
 */
export const Section = forwardRef<HTMLElement, SectionProps>(({ direction = 'col', ...props }, ref) => {
    return <BoxBase ref={ref} {...props} component="section" direction={direction} elementClass="uui-section" />;
});

Section.displayName = 'Section';
