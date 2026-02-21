import { createRoot } from 'react-dom/client';

import { ToastViewport } from '../../components/toast/toastViewport';

export const TOAST_VIEWPORT_ID = 'uui-toast-viewport-root';

export function ensureViewport() {
  if (document.getElementById(TOAST_VIEWPORT_ID)) {
    return;
  }

  const container = document.createElement('div');
  container.id = TOAST_VIEWPORT_ID;
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<ToastViewport />);
}
