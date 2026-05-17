'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { docsNav, DocsNavItem } from '../content/docsNav';

function NavItems({ items, level = 0 }: { items: DocsNavItem[]; level?: number }) {
    const pathname = usePathname();

    return (
        <ul className={level === 0 ? 'space-y-6' : 'mt-2 space-y-1'}>
            {items.map(item => {
                const active = item.href === pathname;
                const content = item.href ? (
                    <Link
                        className={[
                            'block rounded px-2 py-1.5 text-sm',
                            active
                                ? 'bg-[var(--uui-color-primary-container)] text-[var(--uui-color-on-primary-container)]'
                                : 'text-[var(--uui-color-on-surface-variant)] hover:bg-[var(--uui-color-surface-container)]',
                        ].join(' ')}
                        href={item.href}>
                        {item.title}
                    </Link>
                ) : (
                    <span className="block px-2 py-1.5 text-sm text-[var(--uui-color-outline)]">{item.title}</span>
                );

                return (
                    <li key={`${item.title}-${item.href ?? 'group'}`}>
                        {level === 0 ? (
                            <div className="px-2 text-xs font-semibold uppercase tracking-wide text-[var(--uui-color-on-surface)]">
                                {item.title}
                            </div>
                        ) : (
                            content
                        )}
                        {item.items ? <NavItems items={item.items} level={level + 1} /> : null}
                    </li>
                );
            })}
        </ul>
    );
}

export function DocsSidebar() {
    return (
        <aside className="hidden border-r border-[var(--uui-color-outline-variant)] px-4 py-8 lg:block">
            <nav className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
                <NavItems items={docsNav} />
            </nav>
        </aside>
    );
}
