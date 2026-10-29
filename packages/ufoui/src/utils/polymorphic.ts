import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ReactNode } from 'react';

/**
 * Props of a polymorphic component.
 *
 * Merges own props with the props of the element rendered by `as`. Own props take precedence,
 * so a name declared by the component is never shadowed by a native attribute of the same name.
 *
 * @typeParam T - Element type rendered by the component.
 * @typeParam P - Own props of the component.
 *
 * @category Utils
 *
 * @example
 * export type LinkProps<T extends ElementType = 'a'> = PolymorphicProps<T, LinkOwnProps>;
 */
export type PolymorphicProps<T extends ElementType, P> = {
    /** Underlying element or router component. */
    as?: T;
} & P &
    Omit<ComponentPropsWithoutRef<T>, 'as' | keyof P>;

/**
 * Call signature of a polymorphic component.
 *
 * Used as a cast target for `forwardRef`, which erases the type parameter. The `ref` is typed
 * from the element rendered by `as`.
 *
 * @typeParam P - Own props of the component.
 * @typeParam D - Element type rendered when `as` is omitted.
 * @typeParam C - Element types accepted by `as`. Default: any element type.
 *
 * @category Utils
 *
 * @example
 * export const Link = forwardRef(LinkInner) as PolymorphicComponent<LinkOwnProps, 'a'>;
 */
export interface PolymorphicComponent<P, D extends C, C extends ElementType = ElementType> {
    <T extends C = D>(props: PolymorphicProps<T, P> & { ref?: ComponentPropsWithRef<T>['ref'] }): ReactNode;
    displayName?: string;
}
