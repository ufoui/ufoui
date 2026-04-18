/**
 * Merges override values into a base string map, skipping `undefined` entries.
 *
 * @typeParam TBase - Base map type to preserve in the merged result.
 * @param base - Base key/value map.
 * @param overrides - Optional override map where `undefined` means "no change".
 * @returns Object with merged map and list of keys that were actually applied.
 * @category Theme
 */
export function mergeOverrides<TBase extends Record<string, string>>(
    base: TBase,
    overrides?: Record<string, string | undefined>
): { merged: TBase; appliedKeys: string[] } {
    const merged: Record<string, string> = { ...base };
    const appliedKeys: string[] = [];

    for (const [key, value] of Object.entries(overrides ?? {})) {
        if (value !== undefined) {
            merged[key] = value;
            appliedKeys.push(key);
        }
    }

    return { merged: merged as TBase, appliedKeys };
}
