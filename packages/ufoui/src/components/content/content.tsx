import { forwardRef } from 'react';

import { BoxBase, BoxBaseProps } from '../base/boxBase/boxBase';

/**
 * Props for {@link Content}.
 * Extends {@link BoxBaseProps} except for `elementClass` and `component`.
 *
 * @category Box
 */
export type ContentProps = Omit<BoxBaseProps, 'elementClass' | 'component'>;

/**
 * Layout wrapper for the main article content.
 *
 * Renders a native div and forwards all layout props to {@link BoxBase}.
 * Intended as a structural container for Sections, typically paired with Aside.
 *
 * @function
 * @example
 * <Article elevation={1} shape="rounded">
 *   <Content>
 *     <Section />
 *     <Section />
 *     <Section />
 *   </Content>
 *   <Aside />
 * </Article>
 *
 * @category Box
 */
export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ direction = 'col', ...props }, ref) => {
    return (
      <BoxBase
        ref={ref}
        {...props}
        direction={direction}
        elementClass="uui-article-content"
      />
    );
  },
);

Content.displayName = 'Content';
