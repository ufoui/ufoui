import { forwardRef } from 'react';

import { BoxBase, BoxBaseProps } from '@ufoui/core';

/**
 * Props for {@link Main}.
 * Extends {@link BoxBaseProps} except for `elementClass` and `component`.
 *
 * @category Box
 */
export type MainProps = Omit<BoxBaseProps, 'elementClass' | 'component'>;

/**
 * Semantic layout wrapper for the native `<main>` element.
 *
 * Built on top of {@link BoxBase}, inheriting its layout and styling props.
 * Defaults to a column layout (`direction="col"`) and applies
 * the semantic UUI class `"uui-main"`.
 *
 * Use for the primary content region of an application or document.
 *
 * @function
 * @param props - All layout and style props inherited from {@link BoxBase}.
 * @example
 * <Main elevation={1} shape="rounded">
 *   <Section />
 * </Main>
 *
 * @category Box
 */
export const Main = forwardRef<HTMLElement, MainProps>(
  ({ direction = 'col', ...props }, ref) => {
    return (
      <BoxBase
        ref={ref}
        {...props}
        component="main"
        direction={direction}
        elementClass="uui-main"
      />
    );
  },
);

Main.displayName = 'Main';
