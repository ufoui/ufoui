import React, { isValidElement, ReactNode } from 'react';

/**
 * Flattens a React node tree by one level, unwrapping Fragments.
 *
 * Accepts a single element, a Fragment, or an array and returns a flat array
 * of `ReactNode` items. Useful in components that need to identify or count
 * specific child types via type guards.
 *
 * @param node - React node to flatten.
 * @returns Flat array of React nodes with top-level Fragments unwrapped.
 *
 * @example
 * const items = flatChildren(actions).filter(isDialogAction);
 *
 * @category Utils
 */
export const flatChildren = (node: ReactNode): ReactNode[] => {
    const items = React.Children.toArray(node) as ReactNode[];
    return items.flatMap((item): ReactNode[] => {
        if (isValidElement(item) && item.type === React.Fragment) {
            return React.Children.toArray(item.props.children as ReactNode) as ReactNode[];
        }
        return [item];
    });
};
