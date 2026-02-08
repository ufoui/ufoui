import { forwardRef } from 'react';

import { BoxBase, BoxBaseProps } from '@ufoui/core';

/**
 * Props for {@link Header}.
 * Extends {@link BoxBaseProps} except for `elementClass` and `component`.
 *
 * @category Box
 */
export type HeaderProps = Omit<BoxBaseProps, 'elementClass' | 'component'>;

/**
 * Semantic layout wrapper for the native `<header>` element.
 *
 * Built on top of {@link BoxBase}, inheriting its layout and styling props.
 * Defaults to a row layout (`direction="row"`) and applies
 * the semantic UUI class `"uui-header"`.
 *
 * Use for introductory or navigational top-level content.
 *
 * @function
 * @param props - All layout and style props inherited from {@link BoxBase}.
 * @example
 * <Header elevation={1} shape="rounded">
 *   <Logo />
 * </Header>
 *
 * @category Box
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ direction = 'row', ...props }, ref) => {
    return (
      <BoxBase
        ref={ref}
        {...props}
        component="header"
        direction={direction}
        elementClass="uui-header"
      />
    );
  },
);

Header.displayName = 'Header';
