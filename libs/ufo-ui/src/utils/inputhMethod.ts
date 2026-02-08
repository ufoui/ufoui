let initialized = false;
let lastInput: 'keyboard' | 'pointer' = 'pointer';

/**
 * Initializes global listeners that track the user's last interaction method.
 *
 * The setup runs once per runtime and updates the internal interaction
 * modality based on keyboard or pointer input.
 *
 * @internal
 */
export function ensureInputMethod() {
    if (initialized || typeof window === 'undefined') {
        return;
    }
    initialized = true;

    window.addEventListener(
        'keydown',
        () => {
            lastInput = 'keyboard';
        },
        true
    );

    window.addEventListener(
        'pointerdown',
        () => {
            lastInput = 'pointer';
        },
        true
    );
}

/**
 * Returns the last detected interaction method.
 *
 * Possible values are `'keyboard'` or `'pointer'`.
 *
 * @internal
 */
export function getInputMethod() {
    return lastInput;
}
