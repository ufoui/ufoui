'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { FiGithub, FiPackage } from 'react-icons/fi';

import { Button } from '@ufoui/core';

import { docsConfig } from '../content/docsConfig';
import { DocsSidebar } from './docsSidebar';
import { LightModeButton } from './lightModeButton';

export function DocsShell({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[var(--uui-color-background)] text-[var(--uui-color-on-background)]">
            <header className="bg-[var(--uui-color-surface)]/95 sticky top-0 z-20 border-b border-[var(--uui-color-outline-variant)] backdrop-blur">
                <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4">
                    <Link className="text-lg font-semibold" href="/en/docs">
                        ufoui
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="rounded border border-[var(--uui-color-outline-variant)] px-2 py-1 text-xs uppercase tracking-wide">
                            {docsConfig.defaultLocale}
                        </span>
                        <span className="rounded border border-[var(--uui-color-outline-variant)] px-2 py-1 text-xs">
                            {docsConfig.defaultVersion}
                        </span>
                        <LightModeButton />
                        <Button aria-label="Package" icon={<FiPackage />} />
                        <Button aria-label="GitHub" icon={<FiGithub />} />
                    </div>
                </div>
            </header>
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
                <DocsSidebar />
                <main className="min-w-0 px-4 py-8 lg:px-10">
                    <article className="docs-content max-w-4xl">{children}</article>
                </main>
            </div>
        </div>
    );
}
