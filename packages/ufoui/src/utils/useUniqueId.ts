import { useId } from 'react';

/**
 * Generates a stable React component ID safe for SSR and hydration.
 *
 * @param prefix - String prepended to the generated ID.
 * @returns A unique ID in the form `${prefix}_xxxx`.
 *
 * @category Utils
 */
export const useUniqueId = (prefix: string) => {
    const reactId = useId();
    return `${prefix}_${reactId.replace(/:/g, '')}`;
};
