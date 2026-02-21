/**
 * Generates a fast, pseudo-random unique ID.
 *
 * @param prefix - String prepended to the generated ID.
 * @returns A unique ID in the form `${prefix}_xxxx`.
 *
 * @remarks
 * - Uses `Math.random()` → extremely fast, ideal for UI/runtime IDs.
 * - Not cryptographically secure.
 * - Suitable for components, form fields, ripple effects, etc.
 *
 * @category Utils
 */
export const uniqueID = (prefix: string) =>
  // eslint-disable-next-line sonarjs/pseudo-random
  `${prefix}_${Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)}`;
