import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@ufoui/core/index.css';
import './globals.css';

import { Providers } from './providers';

export const metadata: Metadata = {
    title: {
        default: 'ufoui Docs',
        template: '%s | ufoui Docs',
    },
    description: 'Documentation and component examples for ufoui.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
