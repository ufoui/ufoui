/**
 * Creates a style builder for MD3 color tokens.
 *
 * @remarks
 * The builder provides typed functions for applying theme color tokens
 * to background, text, border, and outline properties using CSS variables.
 *
 * - `bg(color)` — sets background from any ThemeColor
 * - `bg.on(surfaceColor)` — sets background from corresponding `on-*` surface color
 * - `bg.container(semanticColor)` — sets semantic `*-container` background
 * - `bg.onContainer(semanticColor)` — sets semantic `on-*-container` background
 * - `bg.fixed(semanticColor)` — semantic `*-fixed` background
 * - `bg.fixedDim(semanticColor)` — semantic `*-fixed-dim` background
 *
 * - `text(color)` — sets text color from any ThemeColor
 * - `text.on(surfaceColor)` — sets text from `on-*` surface colors
 * - `text.onContainer(semanticColor)` — sets text from semantic `on-*-container`
 *
 * - `border(color)` — sets border-color from any ThemeColor
 * - `outline(color)` — sets outline-color from any ThemeColor
 *
 * The builder accumulates all style operations internally
 * and exposes them via `.get()` as a final React.CSSProperties object.
 *
 * @example
 * const style = ColorStyle();
 * style.bg('surfaceContainerLow');
 * style.text.on('surface');
 * return <button style={style.get()}>Press</button>;
 */
import React from 'react';

import {
  capitalize,
  inverseColorMap,
  SemanticColor,
  SurfaceColor,
  ThemeColor,
} from './color';

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
  function set<K extends CSSPropertyKey>(
    key: K,
    value: React.CSSProperties[K],
  ): void;
  function set(key: CSSVar, value: string): void;
  function set(key: string, value: unknown): void {
    (bag as Record<string, unknown>)[key] = value;
  }

  const toVar = (token: string) =>
    `var(--uui-color-${token.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())})`;

  const mk = (apply: (v: string) => void) =>
    Object.assign(
      (color?: ThemeColor) => {
        if (color) {
          apply(toVar(color));
        }
      },
      {
        on(color?: SurfaceColor) {
          if (color) {
            const mapped = inverseColorMap[color];

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
      },
    );

  const bg = mk((v) => {
    set('backgroundColor', v);
  });
  const text = mk((v) => {
    set('color', v);
  });
  const border = mk((v) => {
    set('borderColor', v);
  });
  const outline = mk((v) => {
    set('outlineColor', v);
  });
  const current = mk((v) => {
    set('--uui-current-color', v);
  });

  const stroke = mk((v) => {
    set('stroke', v);
  });

  const fill = mk((v) => {
    set('fill', v);
  });

  return {
    bg,
    text,
    border,
    outline,
    current,
    stroke,
    fill,
    set,
    get() {
      return bag;
    },

    merge(styles?: React.CSSProperties) {
      if (!styles) {
        return;
      }
      Object.assign(bag, styles);
    },
  };
}
