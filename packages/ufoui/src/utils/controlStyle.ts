/**
 * Creates a style builder for MD3 color tokens.
 *
 * @remarks
 * The builder provides typed functions for applying theme color tokens
 * to background, text, border, outline, SVG and CSS-variable targets.
 *
 * Every target is callable and shares the same token variants:
 *
 * - `target(color)` — any ThemeColor
 * - `target.on(surfaceColor)` — corresponding `on-*` surface color
 * - `target.container(semanticColor)` — semantic `*-container`
 * - `target.onContainer(semanticColor)` — semantic `on-*-container`
 * - `target.fixed(semanticColor)` — semantic `*-fixed`
 * - `target.fixedDim(semanticColor)` — semantic `*-fixed-dim`
 *
 * Available targets:
 *
 * - `bg` — `background-color`
 * - `text` — `color`
 * - `border` — `border-color`
 * - `outline` — `outline-color`
 * - `current` — the `--uui-current-color` variable, inherited by descendants
 * - `stroke` — SVG `stroke`
 * - `fill` — SVG `fill`
 *
 * Outside the targets:
 *
 * - `token(cssVar, color)` — resolves a ThemeColor into any custom CSS variable
 * - `set(key, value)` — writes any CSS property or CSS variable verbatim
 * - `merge(styles)` — merges caller styles over the builder output, skipping nullish values
 *
 * The builder accumulates all style operations internally
 * and exposes them via `.get()` as a final React.CSSProperties object.
 *
 * @example
 * const style = ControlStyle();
 * style.bg('surfaceContainerLow');
 * style.text.on('surface');
 * style.token('--uui-icon-color', 'primary');
 * return <button style={style.get()}>Press</button>;
 */
import React, { CSSProperties } from 'react';

import { BaseColor, capitalize, getOnColorName, SemanticColor, ThemeColor } from './color';

/**
 * Creates a strictly typed style builder for MD3 color tokens.
 *
 * @category Color
 */
type CSSPropertyKey = Extract<keyof React.CSSProperties, string>;
type CSSVar = `--${string}`;

export function ControlStyle(initial?: React.CSSProperties) {
    const bag: React.CSSProperties = { ...(initial || {}) };

    // ─────────────────────────────────────────────────────────────
    // set() – single public API (CSS props + CSS variables)
    // ─────────────────────────────────────────────────────────────
    function set<K extends CSSPropertyKey>(key: K, value: React.CSSProperties[K]): void;
    function set(key: CSSVar, value: string): void;
    function set(key: string, value: unknown): void {
        (bag as Record<string, unknown>)[key] = value;
    }

    const toVar = (token: string) => `var(--uui-color-${token.replace(/[A-Z]/g, m => '-' + m.toLowerCase())})`;

    const mk = (apply: (v: string) => void) =>
        Object.assign(
            (color?: ThemeColor) => {
                if (color) {
                    apply(toVar(color));
                }
            },
            {
                on(color?: BaseColor) {
                    if (color) {
                        const mapped = getOnColorName(color);
                        if (mapped !== undefined) {
                            apply(toVar(mapped));
                        }
                    }
                },
                container(color?: SemanticColor) {
                    if (color) {
                        apply(toVar(`${color}Container`));
                    }
                },
                onContainer(color?: SemanticColor) {
                    if (color) {
                        apply(toVar(`on${capitalize(color)}Container`));
                    }
                },
                fixed(color?: SemanticColor) {
                    if (color) {
                        apply(toVar(`${color}Fixed`));
                    }
                },
                fixedDim(color?: SemanticColor) {
                    if (color) {
                        apply(toVar(`${color}FixedDim`));
                    }
                },
            }
        );

    const bg = mk(v => {
        set('backgroundColor', v);
    });
    const text = mk(v => {
        set('color', v);
    });
    const border = mk(v => {
        set('borderColor', v);
    });
    const outline = mk(v => {
        set('outlineColor', v);
    });
    const current = mk(v => {
        set('--uui-current-color', v);
    });

    const stroke = mk(v => {
        set('stroke', v);
    });

    const fill = mk(v => {
        set('fill', v);
    });

    const token = (key: CSSVar, color?: ThemeColor) => {
        if (color) {
            set(key, toVar(color));
        }
    };

    return {
        bg,
        text,
        border,
        outline,
        current,
        stroke,
        fill,
        token,
        set,
        get() {
            return bag;
        },

        merge(styles?: React.CSSProperties) {
            if (!styles) {
                return;
            }
            // eslint-disable-next-line eqeqeq
            const newStyles = Object.fromEntries(Object.entries(styles).filter(([_, v]) => v != null)) as CSSProperties;
            Object.assign(bag, newStyles);
        },
    };
}
