import type { ReactNode } from 'react';

export function CodePreview({ children }: { children: ReactNode }) {
    return (
        <div className="not-prose my-6 overflow-hidden rounded-lg border border-[var(--uui-color-outline-variant)]">
            <div className="flex min-h-32 items-center justify-center bg-[var(--uui-color-surface-container-low)] p-8">
                {children}
            </div>
        </div>
    );
}
