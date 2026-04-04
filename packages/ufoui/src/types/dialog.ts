import { MotionAnimation } from './motion';

/**
 * Layout mode for the DialogBase component.
 *
 * @remarks
 * Determines dialog placement and sizing:
 * - `'basic'` - centered dialog
 * - `'fullscreen'` - full viewport
 * - `'dockLeft'` / `'dockRight'` / `'dockTop'` / `'dockBottom'` -  edge-docked panels
 *
 * @category Dialog
 */
export type DialogType = 'basic' | 'fullscreen' | 'dockRight' | 'dockLeft' | 'dockTop' | 'dockBottom';

/**
 * Animation preset for open and close transitions.
 *
 * @remarks
 * Use `'none'` to disable motion. Otherwise uses a {@link MotionAnimation} value.
 * When omitted, a default animation is chosen for the current layout mode.
 *
 * @category Dialog
 */
export type DialogAnimation = 'none' | MotionAnimation;

/**
 * Icon slot within dialog layout.
 *
 * Defines where the icon is rendered inside the dialog structure.
 *
 * Slots:
 * - **leading** – inline with the title
 * - **top** – placed above the title in the header
 * - **contentLeft** – placed on the left side of the content area
 * - **contentRight** – placed on the right side of the content area
 *
 * @category Dialog
 */
export type DialogIconSlot = 'leading' | 'top' | 'contentLeft' | 'contentRight';
