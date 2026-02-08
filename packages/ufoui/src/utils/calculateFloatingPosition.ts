import { RefObject } from 'react';

import { ElementAlign } from '@ufoui/core';

/**
 * Floating behavior presets used by `calculateFloatingPosition()`.
 *
 * @remarks
 * Each mode defines its own fallback placement list:
 * - **tooltip** – top/bottom center.
 * - **dropdown** – bottom → top.
 * - **menu** – bottomLeft/Right → top.
 * - **submenu** – right/left of parent item.
 *
 * @category Utils
 */
export type ElementFloatingMode = 'tooltip' | 'dropdown' | 'menu' | 'submenu';

/**
 * Options for floating element positioning.
 *
 * @property placement - Initial placement or `"auto"` for fallbacks.
 * @property offset - Gap (in px) between elements.
 * @property mode - Floating behavior preset.
 *
 * @category Utils
 */
export interface CalculateFloatingPositionOptions {
  placement?: ElementAlign;
  offset?: number;
  mode?: ElementFloatingMode;
}

/**
 * Computed final placement of the floating element.
 *
 * @property x - Clamped X coordinate.
 * @property y - Clamped Y coordinate.
 * @property placement - Placement actually applied after fallback logic.
 *
 * @category Utils
 */
export interface ElementFloatingPosition {
  x: number;
  y: number;
  placement: ElementAlign;
}

/**
 * Computes the optimal on-screen position for tooltips, dropdowns, menus and submenus.
 *
 * @param referenceRef - Ref to anchor element.
 * @param floatingRef - Ref to floating panel element.
 * @param options - Placement configuration.
 *
 * @returns Final `{ x, y, placement }`, or `null` when refs are missing.
 *
 * @remarks
 * - Supports `"auto"` with preset-specific fallbacks (`mode`).
 * - Prevents overflow — returned values are fully **viewport clamped**.
 * - Works with all UUI floating components.
 * - Side placements (`centerLeft`, `centerRight`) ignore vertical overflow by design.
 *
 * @example
 * const pos = calculateFloatingPosition(refTrigger, refPanel, {
 *     placement: "auto",
 *     offset: 8,
 *     mode: "menu"
 * });
 *
 * @category Utils
 */
export function calculateFloatingPosition(
  referenceRef: RefObject<HTMLElement>,
  floatingRef: RefObject<HTMLElement>,
  options: CalculateFloatingPositionOptions = {},
): ElementFloatingPosition | null {
  const { placement = 'topCenter', offset = 8, mode = 'tooltip' } = options;

  const EDGE_PAD = 12;

  const modeFallbacks: Record<ElementFloatingMode, ElementAlign[]> = {
    tooltip: ['topCenter', 'bottomCenter', 'centerRight', 'centerLeft'],
    dropdown: ['bottomCenter', 'topCenter', 'centerRight', 'centerLeft'],
    menu: [
      'bottomLeft',
      'bottomRight',
      'topLeft',
      'topRight',
      'centerRight',
      'centerLeft',
    ],
    submenu: [
      'topRightOut',
      'topLeftOut',
      'centerRight',
      'centerLeft',
      'bottomCenter',
      'topCenter',
    ],
  };

  const fallbackPlacements =
    placement === 'auto'
      ? modeFallbacks[mode]
      : [placement, ...modeFallbacks[mode]];

  const reference = referenceRef.current;
  const floating = floatingRef.current;
  if (!reference || !floating) {
    return null;
  }

  const refRect = reference.getBoundingClientRect();
  const floatRect = floating.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const tryPlacement = (place: ElementAlign): ElementFloatingPosition => {
    let x = 0;
    let y = 0;

    switch (place) {
      case 'topCenter':
        x = refRect.left + (refRect.width - floatRect.width) / 2;
        y = refRect.top - floatRect.height - offset;
        break;

      case 'topLeft':
        x = refRect.left;
        y = refRect.top - floatRect.height - offset;
        break;

      case 'topRight':
        x = refRect.right - floatRect.width;
        y = refRect.top - floatRect.height - offset;
        break;

      case 'bottomCenter':
        x = refRect.left + (refRect.width - floatRect.width) / 2;
        y = refRect.bottom + offset;
        break;

      case 'bottomLeft':
        x = refRect.left;
        y = refRect.bottom + offset;
        break;

      case 'bottomRight':
        x = refRect.right - floatRect.width;
        y = refRect.bottom + offset;
        break;

      case 'centerLeft':
        x = refRect.left - floatRect.width - offset;
        y = refRect.top + (refRect.height - floatRect.height) / 2;
        break;

      case 'centerRight':
        x = refRect.right + offset;
        y = refRect.top + (refRect.height - floatRect.height) / 2;
        break;

      case 'center':
        x = refRect.left + (refRect.width - floatRect.width) / 2;
        y = refRect.top + (refRect.height - floatRect.height) / 2;
        break;

      case 'topRightOut':
        x = refRect.right + offset;
        y = refRect.top;
        break;

      case 'topLeftOut':
        x = refRect.left - floatRect.width - offset;
        y = refRect.top;
        break;
    }

    return { x, y, placement: place };
  };

  for (const p of fallbackPlacements) {
    const pos = tryPlacement(p);

    const fitsHorizontally =
      pos.x >= 0 && pos.x + floatRect.width <= viewportWidth;
    const fitsVertically =
      pos.y >= 0 && pos.y + floatRect.height <= viewportHeight;

    let fits = false;

    if (p === 'centerLeft' || p === 'centerRight') {
      fits = fitsHorizontally;
    } else if (p === 'topCenter' || p === 'bottomCenter' || p === 'center') {
      fits = fitsVertically;
    } else {
      fits = fitsHorizontally && fitsVertically;
    }

    if (fits) {
      pos.x = Math.max(
        EDGE_PAD,
        Math.min(pos.x, viewportWidth - floatRect.width - EDGE_PAD),
      );
      pos.y = Math.max(
        EDGE_PAD,
        Math.min(pos.y, viewportHeight - floatRect.height - EDGE_PAD),
      );

      return pos;
    }
  }

  // Fallback — clamp with edge padding
  const fallback = tryPlacement(placement);

  fallback.x = Math.max(
    EDGE_PAD,
    Math.min(fallback.x, viewportWidth - floatRect.width - EDGE_PAD),
  );
  fallback.y = Math.max(
    EDGE_PAD,
    Math.min(fallback.y, viewportHeight - floatRect.height - EDGE_PAD),
  );

  return fallback;
}
