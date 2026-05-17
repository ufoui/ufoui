'use client';

import type { ReactNode } from 'react';

import { ThemeProvider } from '@ufoui/core';

export function Providers({ children }: { children: ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>;
}
