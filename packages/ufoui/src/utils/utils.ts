import React from 'react';

export type ElementSize =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge';
export type ElementInset =
  | 'none'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'middle';
export type ElementShape = 'square' | 'smooth' | 'rounded' | 'round';
/**
 * Border width levels used across UUI components (0–4).
 *
 * @remarks
 * Numeric scale mapped to design-token border thickness:
 * - **0** – no border
 * - **1** – thin (default)
 * - **2–3** – medium / strong emphasis
 * - **4** – maximum emphasis
 *
 * Used by inputs, buttons, menus, cards and other surface components.
 *
 * @category Utils
 */
export type ElementBorder = 0 | 1 | 2 | 3 | 4;
export type ElementOutline = 0 | 1 | 2 | 3 | 4;
/**
 * Layout orientation used by axis-based components.
 *
 * @remarks
 * Determines whether a component operates along the vertical
 * (top-to-bottom) or horizontal (left-to-right) axis.
 *
 * Commonly used by components that can render in two directions,
 * such as Collapse, Tabs, Divider, and Accordion.
 *
 * - **vertical** – primary axis is height (Y-axis)
 * - **horizontal** – primary axis is width (X-axis)
 *
 * @category Utils
 */
export type ElementOrientation = 'vertical' | 'horizontal';
/**
 * Elevation (shadow depth) levels used across UUI surfaces.
 *
 * @remarks
 * Maps numeric values **0–5** to predefined shadow tokens (`--uui-elevation-*`):
 * - **0** — no shadow
 * - **1–2** — low elevation (small ambient + subtle directional shadow)
 * - **3–4** — medium elevation (stronger spread, more depth)
 * - **5** — highest elevation (max separation from background)
 *
 * Each level resolves to a CSS `box-shadow` defined in theme tokens.
 * Supports hover/pressed elevation transitions via utility classes:
 * - `.uui-hover-elevate`
 * - `.uui-pressed-elevate`
 *
 * Used by menus, cards, buttons, popovers and all floating surfaces.
 *
 * @category Utils
 */
export type ElementElevation = 0 | 1 | 2 | 3 | 4 | 5;
/**
 * Alignment positions for floating and anchored UI components.
 *
 * @remarks
 * Defines all relative placements between a reference element and its
 * floating content (menus, tooltips, dropdowns, submenus).
 *
 * Standard positions:
 * - **topLeft**, **topCenter**, **topRight**
 * - **centerLeft**, **center**, **centerRight**
 * - **bottomLeft**, **bottomCenter**, **bottomRight**
 *
 * Extended positions (used mainly for submenus):
 * - **topRightOut** – flush to the right, outside the reference element.
 * - **topLeftOut** – flush to the left, outside the reference element.
 *
 * Special:
 * - **auto** – automatically selects the best fitting placement.
 *
 * @category Utils
 */
export type ElementAlign =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'centerLeft'
  | 'center'
  | 'centerRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'topRightOut'
  | 'topLeftOut'
  | 'auto';
export type ElementDensity = 'comfortable' | 'compact' | 'dense';
export type ElementFocusEffect = 'ring' | 'overlay';
export type ElementPressedEffect = 'elevate' | 'overlay' | 'scale';
export type ElementHoverEffect = 'elevate' | 'overlay' | 'color';
export type ElementSelectedEffect = 'color' | 'morph' | 'border' | 'overlay';
export type ElementTouchEffect = 'ripple';
export type ElementFont =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'caption'
  | 'overline';
export type ElementTextPlacement = 'start' | 'end' | 'top' | 'bottom';

export const getAlignClass = (position: ElementAlign) => {
  const positions = {
    topLeft: 'uui-top-left',
    topCenter: 'uui-top-center',
    topRight: 'uui-top-right',
    topRightOut: 'uui-top-right-out',
    topLeftOut: 'uui-top-left-out',
    centerLeft: 'uui-center-left',
    center: 'uui-center',
    centerRight: 'uui-center-right',
    bottomLeft: 'uui-bottom-left',
    bottomCenter: 'uui-bottom-center',
    bottomRight: 'uui-bottom-right',
    auto: 'uui-top-right',
  };
  return positions[position];
};

export const getShapeClass = (shape: ElementShape) => {
  switch (shape) {
    case 'square':
      return 'uui-square';
    case 'smooth':
      return 'uui-smooth';
    case 'rounded':
      return 'uui-rounded';
    case 'round':
      return 'uui-round';
    default:
      return '';
  }
};

export const getSizeClass = (size: ElementSize) => {
  const map = {
    extraSmall: 'uui-extra-small',
    small: 'uui-small',
    medium: 'uui-medium',
    large: 'uui-large',
    extraLarge: 'uui-extra-large',
  } as const;

  return map[size];
};

/**
 * Returns the appropriate CSS class for the given border size.
 *
 * @param border - Border size (0 to 4)
 * @returns A class name like 'uui-border-2'
 */
export const getBorderClass = (border?: ElementBorder): string => {
  const size = clampInt(0, 5, border);
  if (size === undefined) {
    return '';
  }
  return `uui-border-${size}`;
};

/**
 * Returns the appropriate CSS class for the given outline size.
 *
 * @param size - Outline size (0 to 4)
 * @returns A class name like 'uui-outline-2'
 */
export const getOutlineClass = (size: ElementBorder): string => {
  if (+size > 0 || +size < 5) {
    return `uui-outline-${String(size)}`;
  }
  return 'uui-outline-0';
};

export const getElevationClass = (elevation?: ElementElevation) => {
  switch (elevation) {
    case 0:
      return 'uui-elevation-0';
    case 1:
      return 'uui-elevation-1';
    case 2:
      return 'uui-elevation-2';
    case 3:
      return 'uui-elevation-3';
    case 4:
      return 'uui-elevation-4';
    case 5:
      return 'uui-elevation-5';
    default:
      return '';
  }
};

export const getDensityClass = (density?: ElementDensity) => {
  switch (density) {
    case 'compact':
      return 'uui-compact';
    case 'dense':
      return 'uui-dense';
    default:
      return '';
  }
};

export const getFontClass = (font: ElementFont): string => {
  const map: Record<ElementFont, string> = {
    displayLarge: 'uui-font-display-large',
    displayMedium: 'uui-font-display-medium',
    displaySmall: 'uui-font-display-small',

    headlineLarge: 'uui-font-headline-large',
    headlineMedium: 'uui-font-headline-medium',
    headlineSmall: 'uui-font-headline-small',

    titleLarge: 'uui-font-title-large',
    titleMedium: 'uui-font-title-medium',
    titleSmall: 'uui-font-title-small',

    labelLarge: 'uui-font-label-large',
    labelMedium: 'uui-font-label-medium',
    labelSmall: 'uui-font-label-small',

    bodyLarge: 'uui-font-body-large',
    bodyMedium: 'uui-font-body-medium',
    bodySmall: 'uui-font-body-small',

    caption: 'uui-font-caption',
    overline: 'uui-font-overline',
  };

  return map[font];
};

/**
 * Merges multiple React refs into a single ref callback.
 *
 * @param refs - List of refs (callback refs or `MutableRefObject`s) to update.
 * @returns A ref callback that assigns the same value to all provided refs.
 *
 * @remarks
 * - Supports both function refs and object refs.
 * - Commonly used when forwarding a ref while also keeping a local one.
 *
 * @example
 * const innerRef = useRef<HTMLDivElement>(null);
 * const merged = mergeRefs(ref, innerRef);
 *
 * <div ref={merged} />
 *
 * @category Utils
 */
export function mergeRefs<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        const mutableRef = ref as React.MutableRefObject<T | null>;
        mutableRef.current = value;
      }
    });
  };
}

/**
 * Creates a material-style ripple effect inside the given element.
 *
 * @param el - Target element that receives the ripple.
 * @param event - Mouse event used to determine the ripple origin.
 *
 * @remarks
 * - Automatically clears previous ripples.
 * - Injects a `.ripple-container` and `.ripple` element.
 * - Uses the element's client size and border radius.
 * - Safe for buttons, icon buttons, list items, etc.
 *
 * @category Utils
 */
export const createRipple = (
  el: HTMLElement,
  event: React.MouseEvent<HTMLElement>,
  host?: HTMLElement,
) => {
  const target = host ?? el;

  const old = target.querySelector('.ripple-container');
  if (old) {
    old.remove();
  }

  const elRect = el.getBoundingClientRect();
  const hostRect = target.getBoundingClientRect();

  const rawX = event.clientX - elRect.left;
  const rawY = event.clientY - elRect.top;

  const inside =
    rawX >= 0 && rawX <= elRect.width && rawY >= 0 && rawY <= elRect.height;

  const x = inside ? rawX : elRect.width / 2;
  const y = inside ? rawY : elRect.height / 2;

  const diameter = Math.sqrt(
    elRect.width * elRect.width + elRect.height * elRect.height,
  );
  const radius = diameter / 2;

  const container = document.createElement('div');
  container.className = 'ripple-container';
  container.style.position = 'absolute';
  container.style.pointerEvents = 'none';
  container.style.overflow = 'hidden';
  container.style.width = `${elRect.width}px`;
  container.style.height = `${elRect.height}px`;
  container.style.left = `${elRect.left - hostRect.left}px`;
  container.style.top = `${elRect.top - hostRect.top}px`;

  requestAnimationFrame(() => {
    container.style.borderRadius = getComputedStyle(el).borderRadius;
  });

  const circle = document.createElement('span');
  circle.className = 'ripple';
  circle.style.position = 'absolute';
  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`;
  circle.style.left = `${x - radius}px`;
  circle.style.top = `${y - radius}px`;

  container.appendChild(circle);
  target.appendChild(container);

  circle.addEventListener('animationend', () => {
    container.remove();
  });
};

/**
 * Converts a camelCase, PascalCase, or acronym-based string into kebab-case.
 *
 * @param str - Input string to convert.
 * @returns The kebab-case version of the string.
 *
 * @example
 * toKebabCase("myVariableName"); // "my-variable-name"
 * toKebabCase("URLParser"); // "url-parser"
 *
 * @category Utils
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // camelCase, PascalCase
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // HTMLParser → HTML-Parser
    .toLowerCase();
}

/**
 * Forces focus to behave like :focus-visible on all browsers,
 * including Safari which loses :focus-visible heuristics when
 * focus is set programmatically (e.g., in menus or lists).
 *
 * Adds `.uui-focus-visible` to the element on focus, and
 * removes it automatically on blur.
 *
 * Chrome/Firefox:
 *   - still rely on native :focus-visible
 *   - fallback class is ignored (lower specificity)
 *
 * Safari:
 *   - native :focus-visible is unreliable
 *   - fallback `.uui-focus-visible` replaces it
 *
 * @param el - HTMLElement to focus with visible highlighting.
 *
 * @category Utils
 */
export function setFocusVisible(el: HTMLElement | null) {
  if (!el) {
    return;
  }
  el.classList.remove('uui-focus-visible');
  el.focus();
  el.classList.add('uui-focus-visible');
  el.addEventListener(
    'blur',
    () => {
      el.classList.remove('uui-focus-visible');
    },
    { once: true },
  );
}

/**
 * Clamps a numeric value to an integer range with a fallback.
 *
 * Converts the input to a number, rounds it to an integer,
 * then clamps it between `min` and `max`.
 * If the value is not a finite number, returns `fallback`.
 *
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 * @param value - Input value to clamp. Can be any type.
 * @param fallback - Value returned when input is invalid.
 * @returns A clamped integer within the given range.
 *
 * @category Utils
 */
export function clampInt(
  min: number,
  max: number,
  value: unknown,
  fallback?: number,
): number | undefined {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, Math.round(n)));
}
