import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import { TextBase } from '../../../../src/components/base/textBase';

const renderText = (props: Parameters<typeof TextBase>[0] = {}) => {
    const { container } = render(<TextBase {...props} />);
    return container.firstElementChild as HTMLElement;
};

const getStyleMap = (html: string) => {
    const style = html.match(/\sstyle="([^"]*)"/)?.[1] ?? '';
    return Object.fromEntries(
        style
            .split(';')
            .filter(Boolean)
            .map((entry) => {
                const separator = entry.indexOf(':');
                return [entry.slice(0, separator), entry.slice(separator + 1)];
            })
    );
};

// Reading the serialized style attribute keeps the assertion on the real render output while
// avoiding jsdom dropping `var(...)` token values from inline styles.
const textStyle = (props: Parameters<typeof TextBase>[0]) => {
    return getStyleMap(renderToStaticMarkup(<TextBase {...props} />));
};

describe('TextBase — element & rendering', () => {
    it('renders a span with the inline base class by default', () => {
        const el = renderText();

        expect(el.tagName).toBe('SPAN');
        expect(el.classList.contains('uui-inline')).toBe(true);
    });

    it('renders children', () => {
        expect(renderText({ children: 'hello' }).textContent).toBe('hello');
    });

    it('renders a custom element via `as`', () => {
        expect(renderText({ as: 'p' }).tagName).toBe('P');
        expect(renderText({ as: 'h1' }).tagName).toBe('H1');
    });

    it('appends the semantic `elementClass`', () => {
        const el = renderText({ elementClass: 'uui-text' });

        expect(el.classList.contains('uui-inline')).toBe(true);
        expect(el.classList.contains('uui-text')).toBe(true);
    });
});

describe('TextBase — attributes, ref & events', () => {
    it('forwards the ref to the underlying DOM node', () => {
        const ref = createRef<HTMLElement>();
        render(<TextBase as="label" ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('LABEL');
    });

    it('passes through arbitrary HTML attributes', () => {
        const el = renderText({ id: 'text-1', title: 'tip', 'aria-label': 'label' });

        expect(el.id).toBe('text-1');
        expect(el.getAttribute('title')).toBe('tip');
        expect(el.getAttribute('aria-label')).toBe('label');
    });

    it('forwards DOM events', () => {
        const onClick = vi.fn();
        fireEvent.click(renderText({ onClick }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

describe('TextBase — styling tokens', () => {
    it('maps font / shape tokens to classes', () => {
        expect(renderText({ font: 'titleSmall' }).classList.contains('uui-font-title-small')).toBe(true);
        expect(renderText({ shape: 'rounded' }).classList.contains('uui-rounded')).toBe(true);
    });

    it('maps elevation and border tokens to classes', () => {
        expect(renderText({ elevation: 2 }).classList.contains('uui-elevation-2')).toBe(true);
        expect(renderText({ border: 1 }).classList.contains('uui-border-1')).toBe(true);
    });

    it('emits the zero level for elevation / border', () => {
        expect(renderText({ elevation: 0 }).classList.contains('uui-elevation-0')).toBe(true);
        expect(renderText({ border: 0 }).classList.contains('uui-border-0')).toBe(true);
    });

    it('clamps out-of-range elevation (0–5) and border (0–4)', () => {
        expect(renderText({ elevation: 9 }).classList.contains('uui-elevation-5')).toBe(true);
        expect(renderText({ border: 9 }).classList.contains('uui-border-4')).toBe(true);
    });
});

describe('TextBase — colors', () => {
    it('sets the text color directly from the color token', () => {
        expect(textStyle({ color: 'primary' }).color).toBe('var(--uui-color-primary)');
    });

    it('resolves camelCase tokens to kebab-case CSS variables', () => {
        expect(textStyle({ color: 'onSurface' }).color).toBe('var(--uui-color-on-surface)');
    });

    it('sets the border color from the borderColor token', () => {
        expect(textStyle({ borderColor: 'outline' })['border-color']).toBe('var(--uui-color-outline)');
    });
});

describe('TextBase — className & style merge', () => {
    it('merges a custom className alongside the base class', () => {
        const el = renderText({ className: 'custom' });

        expect(el.classList.contains('custom')).toBe(true);
        expect(el.classList.contains('uui-inline')).toBe(true);
    });

    it('merges inline style with computed token style', () => {
        const style = textStyle({ style: { letterSpacing: '1px' }, color: 'primary' });

        expect(style['letter-spacing']).toBe('1px');
        expect(style.color).toBe('var(--uui-color-primary)');
    });
});
