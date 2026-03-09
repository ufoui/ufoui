import { createRoot } from 'react-dom/client';

import { ToastViewport } from '../../components/toast';

let mounted = false;

/**
 * Ensures that a global toast viewport exists.
 *
 * If the user already rendered ToastViewport manually,
 * no additional viewport is created.
 */
export function ensureViewport() {
    if (mounted) {
        return;
    }

    if (document.querySelector('.uui-toast-viewport')) {
        mounted = true;
        return;
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<ToastViewport />);

    mounted = true;
}
