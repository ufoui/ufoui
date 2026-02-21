import { forwardRef } from 'react';

import { BoxBase, BoxBaseProps } from '../base/boxBase';

/**
 * Props for {@link Article}.
 * Extends {@link BoxBaseProps} except for `elementClass` and `component`.
 *
 * @category Box
 */
export type ArticleProps = Omit<BoxBaseProps, 'elementClass' | 'component'>;

/**
 * Semantic layout wrapper for the native `<article>` element.
 * Intended for self-contained content units composed of Sections and optional Aside.
 *
 * Built on top of {@link BoxBase}, inheriting its layout and styling props.
 * Defaults to a column layout (`direction="col"`) and applies
 * the semantic UUI class `"uui-article"`.
 *
 * @function
 * @example
 * <Article elevation={1} shape="rounded">
 *   <Section />
 * </Article>
 *
 * @category Box
 */
export const Article = forwardRef<HTMLElement, ArticleProps>(
  ({ direction = 'col', ...props }, ref) => {
    return (
      <BoxBase
        ref={ref}
        {...props}
        component="article"
        direction={direction}
        elementClass="uui-article"
      />
    );
  },
);

Article.displayName = 'Article';
