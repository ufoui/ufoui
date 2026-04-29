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
