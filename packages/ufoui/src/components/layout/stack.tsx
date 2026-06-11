import { forwardRef } from 'react';

import { BoxBase } from '../base/boxBase';
import { FlexProps } from './flex';

/**
 * Props for the {@link Stack} component.
 *
 * Extends {@link FlexProps} with the layout direction removed —
 * a Stack is always a vertical column.
 *
 * @category Stack
 */
export type StackProps = Omit<FlexProps, 'direction'>;

/**
 * Vertical flex layout container.
 *
 * Renders a flexbox column — the equivalent of `<Flex direction="col">`,
 * exposed as its own component because vertical stacking is the most common
 * layout need. Use this component to stack children top-to-bottom; reach for
 * {@link Flex} when you need a horizontal or configurable direction.
 *
 * Built on top of {@link BoxBase} with `type="flex"` and a locked column direction.
 *
 * @category Stack
 * @function
 * @param props - Vertical flex layout props inherited from {@link Flex}.
 *
 * @example
 * <Stack gap={8}>
 *   <Header />
 *   <Content />
 * </Stack>
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
    return <BoxBase {...props} direction="col" ref={ref} type="flex" />;
});

Stack.displayName = 'Stack';
