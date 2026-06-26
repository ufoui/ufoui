import { ContainerConfig, ThemeBreakpoints } from '../types';
import { toPx } from './breakpoints';

/**
 * Generates the responsive `.uui-container` rules from the theme breakpoints.
 *
 * Width caps come from the breakpoint map (sorted by width, skipping non-positive
 * entries such as `xxs: '0px'`); centering and mobile-first padding come from
 * `container`. Original breakpoint strings are preserved so `px`/`rem` units survive.
 *
 * @param breakpoints - Active theme breakpoint map.
 * @param container - Optional centering and responsive padding configuration.
 *
 * @category Theme
 */
export function applyContainer(breakpoints: ThemeBreakpoints, container?: ContainerConfig): void {
    if (typeof document === 'undefined') {
        return;
    }

    const style =
        (document.getElementById('ufo-ui-container') as HTMLStyleElement | null) ??
        document.head.appendChild(Object.assign(document.createElement('style'), { id: 'ufo-ui-container' }));

    const padding: Record<string, string | undefined> | undefined =
        typeof container?.padding === 'string' ? { base: container.padding } : container?.padding;

    const declarations = (items: Array<string | false | undefined>) => items.filter(Boolean).join(';');
    style.textContent =
        `.uui-container{${declarations([
            'width:100%',
            container?.center !== false && 'margin-inline:auto',
            padding?.base && `padding-inline:${padding.base}`,
        ])}}` +
        Object.entries(breakpoints)
            .map(([key, value]) => ({ key, value, px: toPx(value) }))
            .filter(entry => entry.px > 0)
            .sort((a, b) => a.px - b.px)
            .map(
                ({ key, value }) =>
                    `@media(min-width:${value}){.uui-container{${declarations([
                        `max-width:${value}`,
                        padding?.[key] && `padding-inline:${padding[key]}`,
                    ])}}}`
            )
            .join('');
}
