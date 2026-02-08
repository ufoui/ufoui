import { useSyncExternalStore } from 'react';

import { ensureInputMethod, getInputMethod } from '../utils/inputhMethod';

/**
 * Determines whether focus indicators (focus rings) should be visible.
 *
 * Returns `true` when the user is navigating with the keyboard and `false`
 * for pointer-based interactions (mouse, touch, pen).
 *
 * Internally tracks global interaction modality and mirrors the behavior
 * of the `:focus-visible` specification.
 *
 * @returns `true` if focus should be visibly rendered
 *
 * @example
 * const focusVisible = useFocusVisible();
 *
 * @example
 * <button className={focusVisible ? 'uui-focus-visible' : undefined} />
 *
 * @category Hooks
 */

export function useFocusVisible(): boolean {
  ensureInputMethod();

  return useSyncExternalStore(
    () => () => undefined,
    () => getInputMethod() === 'keyboard',
    () => false,
  );
}
