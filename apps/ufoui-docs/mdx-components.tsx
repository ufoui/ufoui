import type { ComponentType } from 'react';

import { CodePreview } from './components/codePreview';

type MDXComponents = Record<string, ComponentType<Record<string, unknown>> | keyof JSX.IntrinsicElements>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        CodePreview,
        ...components,
    };
}
