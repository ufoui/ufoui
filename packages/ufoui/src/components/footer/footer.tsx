import { forwardRef } from 'react';

import { BoxBase, BoxBaseProps } from '../base/boxBase/boxBase';

/**
 * Props for {@link Footer}.
 * Extends {@link BoxBaseProps} except for `elementClass` and `component`.
 *
 * @category Box
 */
export type FooterProps = Omit<BoxBaseProps, 'elementClass' | 'component'>;

/**
 * Semantic layout wrapper for the native `<footer>` element.
 *
 * Built on top of {@link BoxBase}, inheriting its layout and styling props.
 * Defaults to a row layout (`direction="row"`) and applies
 * the semantic UUI class `"uui-footer"`.
 *
 * Use for closing sections, legal notices, or persistent bottom content.
 *
 * @function
 * @param props - All layout and style props inherited from {@link BoxBase}.
 * @example
 * <Footer elevation={1} shape="rounded">
 *   © 2025 My Company
 * </Footer>
 *
 * @category Box
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ direction = 'row', ...props }, ref) => {
    return (
      <BoxBase
        ref={ref}
        {...props}
        component="footer"
        direction={direction}
        elementClass="uui-footer"
      />
    );
  },
);

Footer.displayName = 'Footer';
