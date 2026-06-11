import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import { BoxBase } from '../../../../src/components/base/boxBase';
import { setColorRegistry } from '../../../../src/utils';

const renderBox = (props: Parameters<typeof BoxBase>[0] = {}) => {
    const { container } = render(<BoxBase {...props} />);
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
const boxStyle = (props: Parameters<typeof BoxBase>[0]) => {
    return getStyleMap(renderToStaticMarkup(<BoxBase {...props} />));
};

describe('BoxBase — element & rendering', () => {
    it('renders a div with the base flex layout classes by default', () => {
        const el = renderBox();

        expect(el.tagName).toBe('DIV');
        expect(el.classList.contains('uui-box')).toBe(true);
        expect(el.classList.contains('uui-flex')).toBe(true);
    });

    it('renders children', () => {
        const el = renderBox({ children: <span data-testid="child">hi</span> });

        expect(el.querySelector('[data-testid="child"]')?.textContent).toBe('hi');
    });

    it('renders a custom element via `as`', () => {
        expect(renderBox({ as: 'section' }).tagName).toBe('SECTION');
        expect(renderBox({ as: 'nav' }).tagName).toBe('NAV');
    });

    it('appends the semantic `elementClass`', () => {
        const el = renderBox({ elementClass: 'uui-section' });

        expect(el.classList.contains('uui-box')).toBe(true);
        expect(el.classList.contains('uui-section')).toBe(true);
    });
});

describe('BoxBase — attributes, ref & events', () => {
    it('forwards the ref to the underlying DOM node', () => {
        const ref = createRef<HTMLElement>();
        render(<BoxBase as="article" ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('ARTICLE');
    });

    it('passes through arbitrary HTML attributes', () => {
        const el = renderBox({ id: 'box-1', role: 'group', title: 'tip', 'aria-label': 'label' });

        expect(el.id).toBe('box-1');
        expect(el.getAttribute('role')).toBe('group');
        expect(el.getAttribute('title')).toBe('tip');
        expect(el.getAttribute('aria-label')).toBe('label');
    });

    it('forwards DOM events', () => {
        const onClick = vi.fn();
        const el = renderBox({ onClick });

        fireEvent.click(el);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

describe('BoxBase — layout type', () => {
    it('grid: applies the grid class and template columns/rows', () => {
        const el = renderBox({ type: 'grid', cols: 3, rows: 2 });

        expect(el.classList.contains('uui-grid')).toBe(true);
        expect(el.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
        expect(el.style.gridTemplateRows).toBe('repeat(2, 1fr)');
    });

    it('grid: passes string templates through unchanged', () => {
        const el = renderBox({ type: 'grid', cols: '200px 1fr', rows: 'auto' });

        expect(el.style.gridTemplateColumns).toBe('200px 1fr');
        expect(el.style.gridTemplateRows).toBe('auto');
    });

    it('block: applies the block class', () => {
        expect(renderBox({ type: 'block' }).classList.contains('uui-block')).toBe(true);
    });

    it('inline variants per layout type', () => {
        expect(renderBox({ inline: true }).classList.contains('uui-flex-inline')).toBe(true);
        expect(renderBox({ type: 'grid', inline: true }).classList.contains('uui-grid-inline')).toBe(true);
        expect(renderBox({ type: 'block', inline: true }).classList.contains('uui-inline-block')).toBe(true);
    });

    it('grid templates are ignored when type is not grid', () => {
        const el = renderBox({ cols: 3, rows: 2 });

        expect(el.style.gridTemplateColumns).toBe('');
        expect(el.style.gridTemplateRows).toBe('');
    });
});

describe('BoxBase — direction & flow', () => {
    it('maps the `direction` prop to the flex direction class', () => {
        expect(renderBox({ direction: 'row' }).classList.contains('uui-flex-row')).toBe(true);
        expect(renderBox({ direction: 'col' }).classList.contains('uui-flex-col')).toBe(true);
    });

    it('direction class is not emitted for non-flex layouts', () => {
        const el = renderBox({ type: 'grid', direction: 'col' });

        expect(el.classList.contains('uui-flex-col')).toBe(false);
    });

    it('maps grid `flow`', () => {
        expect(renderBox({ type: 'grid', flow: 'col' }).classList.contains('uui-grid-flow-col')).toBe(true);
        expect(renderBox({ type: 'grid', flow: 'row' }).classList.contains('uui-grid-flow-row')).toBe(true);
    });

    it('flow is ignored when type is not grid', () => {
        expect(renderBox({ flow: 'col' }).classList.contains('uui-grid-flow-col')).toBe(false);
    });
});

describe('BoxBase — spacing & gap', () => {
    it('applies padding shorthands', () => {
        const el = renderBox({ p: 16 });
        expect(el.style.padding).toBe('16px');
    });

    it('px / py expand to per-axis padding', () => {
        const el = renderBox({ px: 8, py: 4 });

        expect(el.style.paddingLeft).toBe('8px');
        expect(el.style.paddingRight).toBe('8px');
        expect(el.style.paddingTop).toBe('4px');
        expect(el.style.paddingBottom).toBe('4px');
    });

    it('per-side padding overrides the axis shorthand', () => {
        const el = renderBox({ px: 8, pl: 20 });

        expect(el.style.paddingLeft).toBe('20px');
        expect(el.style.paddingRight).toBe('8px');
    });

    it('maps gap shorthands to gap / column-gap / row-gap', () => {
        expect(renderBox({ gap: 8 }).style.gap).toBe('8px');
        expect(renderBox({ gapX: 6 }).style.columnGap).toBe('6px');
        expect(renderBox({ gapY: 10 }).style.rowGap).toBe('10px');
    });
});

describe('BoxBase — sizing', () => {
    it('fullWidth / fullHeight set 100%', () => {
        const el = renderBox({ fullWidth: true, fullHeight: true });

        expect(el.style.width).toBe('100%');
        expect(el.style.height).toBe('100%');
    });

    it('explicit width / height override the full-size flags', () => {
        const el = renderBox({ width: 200, height: 120, fullWidth: true, fullHeight: true });

        expect(el.style.width).toBe('200px');
        expect(el.style.height).toBe('120px');
    });

    it('applies min / max width and height', () => {
        const el = renderBox({ minWidth: 50, maxWidth: 300, minHeight: 40, maxHeight: 200 });

        expect(el.style.minWidth).toBe('50px');
        expect(el.style.maxWidth).toBe('300px');
        expect(el.style.minHeight).toBe('40px');
        expect(el.style.maxHeight).toBe('200px');
    });

    it('accepts string dimension values verbatim (number → px, string as-is)', () => {
        const el = renderBox({ width: '50%', height: '100vh', maxWidth: '60ch', minHeight: 'auto' });

        expect(el.style.width).toBe('50%');
        expect(el.style.height).toBe('100vh');
        expect(el.style.maxWidth).toBe('60ch');
        expect(el.style.minHeight).toBe('auto');
    });

    it('grow adds the grow class', () => {
        expect(renderBox({ grow: true }).classList.contains('uui-grow')).toBe(true);
    });

    it('wrap enables flex-wrap for flex, but not for grid', () => {
        expect(renderBox({ wrap: true }).style.flexWrap).toBe('wrap');
        expect(renderBox({ type: 'grid', wrap: true }).style.flexWrap).toBe('');
    });
});

describe('BoxBase — alignment', () => {
    it('maps the alignment props', () => {
        const el = renderBox({
            justifyContent: 'center',
            alignItems: 'stretch',
            placeItems: 'center',
            alignContent: 'space-between',
        });

        expect(el.style.justifyContent).toBe('center');
        expect(el.style.alignItems).toBe('stretch');
        expect(el.style.placeItems).toBe('center');
        expect(el.style.alignContent).toBe('space-between');
    });
});

describe('BoxBase — wrapper props', () => {
    it('applies margin / position / stacking to the box', () => {
        const el = renderBox({ m: 10, position: 'relative', zIndex: 3, top: 12, left: 5 });

        expect(el.style.margin).toBe('10px');
        expect(el.style.position).toBe('relative');
        expect(el.style.zIndex).toBe('3');
        expect(el.style.top).toBe('12px');
        expect(el.style.left).toBe('5px');
    });

    it('margin axis and per-side shorthands resolve with the right priority', () => {
        const el = renderBox({ mx: 4, my: 2, mt: 8 });

        expect(el.style.marginLeft).toBe('4px');
        expect(el.style.marginRight).toBe('4px');
        expect(el.style.marginTop).toBe('8px');
        expect(el.style.marginBottom).toBe('2px');
    });
});

describe('BoxBase — styling tokens', () => {
    it('maps font / shape tokens to classes', () => {
        expect(renderBox({ font: 'bodyLarge' }).classList.contains('uui-font-body-large')).toBe(true);
        expect(renderBox({ shape: 'rounded' }).classList.contains('uui-rounded')).toBe(true);
    });

    it('maps elevation and border tokens to classes', () => {
        expect(renderBox({ elevation: 3 }).classList.contains('uui-elevation-3')).toBe(true);
        expect(renderBox({ border: 2 }).classList.contains('uui-border-2')).toBe(true);
    });

    it('emits the zero level for elevation / border (0 is not "unset")', () => {
        expect(renderBox({ elevation: 0 }).classList.contains('uui-elevation-0')).toBe(true);
        expect(renderBox({ border: 0 }).classList.contains('uui-border-0')).toBe(true);
    });

    it('clamps out-of-range elevation (0–5) and border (0–4)', () => {
        expect(renderBox({ elevation: 9 }).classList.contains('uui-elevation-5')).toBe(true);
        expect(renderBox({ border: 9 }).classList.contains('uui-border-4')).toBe(true);
    });
});

describe('BoxBase — colors', () => {
    afterEach(() => {
        setColorRegistry({});
    });

    it('sets the surface background from the color token', () => {
        expect(boxStyle({ color: 'surface' })['background-color']).toBe('var(--uui-color-surface)');
    });

    it('sets the matching on-color when the registry provides one', () => {
        setColorRegistry({ surface: { type: 'surface', onColor: 'onSurface' } });
        const style = boxStyle({ color: 'surface' });

        expect(style['background-color']).toBe('var(--uui-color-surface)');
        expect(style.color).toBe('var(--uui-color-on-surface)');
    });

    it('sets the border color from the borderColor token', () => {
        expect(boxStyle({ borderColor: 'outline' })['border-color']).toBe('var(--uui-color-outline)');
    });
});

describe('BoxBase — className & style merge', () => {
    it('merges a custom className alongside the base classes', () => {
        const el = renderBox({ className: 'custom' });

        expect(el.classList.contains('custom')).toBe(true);
        expect(el.classList.contains('uui-box')).toBe(true);
    });

    it('merges inline style with the computed layout style', () => {
        const el = renderBox({ style: { opacity: 0.5 }, p: 16 });

        expect(el.style.opacity).toBe('0.5');
        expect(el.style.padding).toBe('16px');
    });
});
