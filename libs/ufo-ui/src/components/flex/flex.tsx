import { forwardRef } from 'react';

import { BoxBase, BoxBaseProps } from '@ufoui/core';

/**
 * Props for the {@link Flex} component.
 *
 * Extends {@link BoxBaseProps} with grid-related props removed.
 * Intended for flexbox-only layouts.
 *
 * @category Flex
 */
export type FlexProps = Omit<BoxBaseProps, 'elementClass' | 'type' | 'cols' | 'rows' | 'flow'>;

/**
 * Flex layout container.
 *
 * Renders a flexbox-based layout with a horizontal direction by default.
 * Use this component whenever you want to explicitly work with flexbox
 * semantics instead of relying on generic containers.
 *
 * Built on top of {@link BoxBase} and exposes only flex-relevant layout props.
 *
 * @category Flex
 * @function
 * @param props - Flex layout props inherited from {@link BoxBase}.
 *
 * @example
 * <Flex gap={12}>
 *   <Item />
 *   <Item />
 * </Flex>
 *
 * @example
 * <Flex direction="col" gap={8}>
 *   <Header />
 *   <Content />
 * </Flex>
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(({ direction = 'row', ...props }, ref) => {
    return <BoxBase {...props} direction={direction} ref={ref} type="flex" />;
});

Flex.displayName = 'Flex';
