import type { ReactNode } from 'react';

import { DocsShell } from '../../../components/docsShell';

export default function DocsLayout({ children }: { children: ReactNode }) {
    return <DocsShell>{children}</DocsShell>;
}
