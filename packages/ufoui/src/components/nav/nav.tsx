import { forwardRef } from 'react';

import { BoxBase, BoxBaseProps } from '@ufoui/core';

/**
 * Props for {@link Nav}.
 * Extends {@link BoxBaseProps} except for `elementClass` and `component`.
 *
 * @category Box
 */
export type NavProps = Omit<BoxBaseProps, 'elementClass' | 'component'>;

/**
 * Semantic layout wrapper for the native `<nav>` element.
 *
 * Built on top of {@link BoxBase}, inheriting its layout and styling props.
 * Defaults to a row layout (`direction="row"`) and applies
 * the semantic UUI class `"uui-nav"`.
 *
 * Use for primary or secondary navigation menus.
 *
 * @function
 * @param props - All layout and style props inherited from {@link BoxBase}.
 * @example
 * <Nav elevation={1} shape="rounded">
 *   <NavLink href="/">Home</NavLink>
 * </Nav>
 *
 * @category Box
 */
export const Nav = forwardRef<HTMLElement, NavProps>(
  ({ direction = 'row', ...props }, ref) => {
    return (
      <BoxBase
        ref={ref}
        {...props}
        component="nav"
        direction={direction}
        elementClass="uui-nav"
      />
    );
  },
);

Nav.displayName = 'Nav';
