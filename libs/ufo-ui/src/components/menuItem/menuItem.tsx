import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLProps,
  ReactElement,
  ReactNode,
  RefAttributes,
  useRef,
} from 'react';

import {
  createRipple,
  ElementDensity,
  ElementFocusEffect,
  ElementFont,
  ElementSelectedEffect,
  ElementShape,
  ElementTouchEffect,
  getDensityClass,
  getFontClass,
  getShapeClass,
  mergeRefs,
} from '@ufoui/utils';
import { Badge, IS_MENU_ITEM, isMenu, MenuVariant } from '@ufoui/core';

import { ControlStyle, SurfaceColor } from '../../utils/color';

/**
 * Visual variant of a MenuItem.
 *
 * Inherited from {@link MenuVariant}.
 *
 * @category MenuItem
 */
export type MenuItemVariant = MenuVariant;

/**
 * Defines the behavioral type of a MenuItem.
 *
 * - `item` – simple action item
 * - `checkbox` – toggleable multiple-selection item
 * - `radio` – mutually exclusive selection item
 * - `option` – selectable option item
 *
 * @category MenuItem
 */
export type MenuItemType = 'item' | 'checkbox' | 'radio' | 'option';

/**
 * Change event payload for selectable menu items
 * (checkbox, radio and option).
 *
 * @category MenuItem
 */
export interface MenuItemChangeEvent {
  /** Checkbox or radio checked state. */
  checked?: boolean;

  /** Item name identifier. */
  name?: string;

  /** Selection state for option items. */
  selected?: boolean;

  /** Item value identifier. */
  value?: string;
}

/**
 * Props for the {@link MenuItem} component.
 *
 * @category MenuItem
 */
export interface MenuItemProps
  extends Omit<HTMLProps<HTMLDivElement>, 'ref' | 'onChange'> {
  /** Marks item as active (roving focus). */
  active?: boolean;

  /** Badge content rendered at the end. */
  badge?: ReactNode;

  /** Checked state for checkbox or radio items. */
  checked?: boolean;

  /** Icon shown when item is checked. */
  checkedIcon?: ReactNode;

  /** Item content or nested submenu. */
  children?: ReactNode;

  /** Base surface color of the item. */
  color?: SurfaceColor;

  /** Density preset controlling spacing. */
  density?: ElementDensity;

  /** Secondary description text. */
  description?: string;

  /** Text color of the description. */
  descriptionColor?: SurfaceColor;

  /** Font token applied to the description text. */
  descriptionFont?: ElementFont;

  /** Disables interactions and focus. */
  disabled?: boolean;

  /** Icon rendered at the end (alias for `trailing`). */
  endIcon?: ReactNode;

  /** Whether a nested submenu is expanded. */
  expanded?: boolean;

  /** Reserves leading slot even without an icon. */
  fixedLeading?: boolean;

  /** Visual focus effects applied when active. */
  focusEffects?: ElementFocusEffect[];

  /** Forces focus-visible styling. */
  focusVisible?: boolean;

  /** Alias for labelFont. */
  font?: ElementFont;

  /** Enables horizontal layout mode. */
  horizontal?: boolean;

  /** Icon rendered at the start (alias for `leading`). */
  icon?: ReactNode;

  /** Primary label text. */
  label?: string;

  /** Text color of the label. */
  labelColor?: SurfaceColor;

  /** Font token applied to the label text. */
  labelFont?: ElementFont;

  /** Custom leading content. */
  leading?: ReactNode;

  /** Item name used in change events. */
  name?: string;

  /** Change handler for checkbox, radio and option items. */
  onChange?: (e: MenuItemChangeEvent) => void;

  /** Click handler for action items. */
  onClick?: React.MouseEventHandler<HTMLDivElement>;

  /** Selected state for option items. */
  selected?: boolean;

  /** Background color used when selected. */
  selectedColor?: SurfaceColor;

  /** Visual effects applied when selected. */
  selectedEffects?: ElementSelectedEffect[];

  /** Shape token applied to the item. */
  shape?: ElementShape;

  /** Keyboard shortcut label. */
  shortcut?: string;

  /** Text color of the shortcut label. */
  shortcutColor?: SurfaceColor;

  /** Font token applied to the shortcut text. */
  shortcutFont?: ElementFont;

  /** Overrides automatic text color. */
  textColor?: SurfaceColor;

  /** Touch and click feedback effects. */
  touchEffects?: ElementTouchEffect[];

  /** Custom trailing content. */
  trailing?: ReactNode;

  /** Item behavior type. */
  type?: MenuItemType;

  /** Icon shown when item is unchecked. */
  uncheckedIcon?: ReactNode;

  /** Item value used in change events. */
  value?: string;

  /** Visual variant inherited from Menu. */
  variant?: MenuItemVariant;
}

/**
 * Internal props injected by Menu.
 *
 * @internal
 * @category MenuItem
 */
export interface MenuItemInternalProps {
  /** Disables pointer and keyboard interactions. */
  __interactionsDisabled?: boolean;

  /** Item index inside the parent menu. */
  __index?: number;

  /** Index exposed for DOM queries. */
  'data-menu-index'?: number;

  /** ARIA role family inherited from parent container. */
  roleFamily?: 'menu' | 'listbox' | 'command' | 'toolbar';
}

const arrowRight = (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 17V7L15 12L10 17Z" fill="currentColor" />
  </svg>
);

const checkIcon = (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.5501 18L3.8501 12.3L5.2751 10.875L9.5501 15.15L18.7251 5.97498L20.1501 7.39998L9.5501 18Z"
      fill="currentColor"
    />
  </svg>
);

const radioUnchecked = (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
      fill="currentColor"
    />
  </svg>
);

const radioChecked = (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 17C13.3833 17 14.5625 16.5125 15.5375 15.5375C16.5125 14.5625 17 13.3833 17 12C17 10.6167 16.5125 9.4375 15.5375 8.4625C14.5625 7.4875 13.3833 7 12 7C10.6167 7 9.4375 7.4875 8.4625 8.4625C7.4875 9.4375 7 10.6167 7 12C7 13.3833 7.4875 14.5625 8.4625 15.5375C9.4375 16.5125 10.6167 17 12 17ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * **MenuItem** - single interactive item inside a {@link Menu}.
 *
 * Represents an action, checkbox, radio item or selectable option.
 * Supports icons, badges, shortcuts, descriptions and nested submenus.
 *
 * Keyboard interaction and focus are handled by the parent Menu.
 *
 * @param props
 *
 * @example
 * ```tsx
 * <MenuItem label="Open" onClick={handleOpen} />
 * ```
 *
 * @example
 * ```tsx
 * <MenuItem
 *   type="checkbox"
 *   label="Show grid"
 *   checked={enabled}
 *   onChange={() => setEnabled(v => !v)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <MenuItem label="More">
 *   <Menu>
 *     <MenuItem label="Sub item" />
 *   </Menu>
 * </MenuItem>
 * ```
 * @function
 * @category MenuItem
 */
export const MenuItem = forwardRef<
  HTMLDivElement,
  MenuItemProps & MenuItemInternalProps
>(
  (
    {
      shape,
      touchEffects = ['ripple'],
      focusEffects = ['ring', 'overlay'],
      selectedEffects = ['color'],
      checkedIcon,
      uncheckedIcon,
      selectedColor,
      textColor,
      labelColor,
      descriptionColor,
      shortcutColor,
      fixedLeading,
      color,
      icon,
      endIcon,
      leading,
      trailing,
      label,
      disabled = false,
      className,
      onClick,
      badge,
      expanded,
      active,
      children,
      focusVisible,
      type = 'item',
      checked,
      description,
      shortcut,
      density,
      horizontal,
      labelFont,
      font,
      descriptionFont,
      shortcutFont,
      selected,
      __index,
      __interactionsDisabled,
      onChange: _onChange,
      variant = 'classic',
      ...props
    },
    ref,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    const menuItemRef = useRef<HTMLDivElement>(null);
    const childList = React.Children.toArray(children);
    const submenuElement = childList.find((el) => isMenu(el)) as
      | ReactElement
      | undefined;

    const visibleChildren = childList.filter((el) => !isMenu(el));

    const hasSubmenu = Boolean(submenuElement);

    let toggleIcon;
    if (type !== 'item') {
      if (type === 'radio') {
        toggleIcon = checked
          ? (checkedIcon ?? radioChecked)
          : (uncheckedIcon ?? radioUnchecked);
      } else if (type === 'checkbox') {
        toggleIcon = checked ? (checkedIcon ?? checkIcon) : uncheckedIcon;
      }
    }
    const leadingElement =
      toggleIcon ?? leading ?? icon ?? (fixedLeading && !horizontal);
    const contentStart = leadingElement && (
      <div className="uui-icon uui-leading">{leadingElement}</div>
    );

    const trailingElement = trailing ?? endIcon;
    let badgeEl;

    if (badge) {
      if (typeof badge === 'string' || typeof badge === 'number') {
        badgeEl = <Badge value={badge} />;
      } else {
        badgeEl = badge;
      }
    }

    const defaultFont: ElementFont =
      variant === 'modern' ? 'labelLarge' : 'bodyLarge';
    const appliedLabelFont = labelFont ?? font ?? defaultFont;
    const appliedDescriptionFont: ElementFont =
      descriptionFont ?? (variant === 'modern' ? 'bodySmall' : 'bodyMedium');
    const appliedShortcutFont = shortcutFont ?? defaultFont;

    const shortcutStyle = ControlStyle();
    shortcutStyle.text(shortcutColor);
    const trailingIcon =
      hasSubmenu && !horizontal ? arrowRight : trailingElement;
    const trailingText = shortcut && (
      <div
        className={`uui-menu-item-shortcut ${getFontClass(appliedShortcutFont)}`}
        style={shortcutStyle.get()}
      >
        {shortcut}
      </div>
    );
    const contentEnd = (shortcut ?? badge ?? trailingIcon) && (
      <>
        {trailingText}
        {badgeEl}
        {trailingIcon && (
          <div className="uui-icon uui-trailing">{trailingIcon}</div>
        )}
      </>
    );

    const labelStyle = ControlStyle();
    labelStyle.text(labelColor);
    const labelText = label && (
      <div
        className={`uui-menu-item-label ${getFontClass(appliedLabelFont)}`}
        style={labelStyle.get()}
      >
        {label}
      </div>
    );

    const descriptionStyle = ControlStyle();
    if (
      descriptionColor ||
      (!textColor && variant === 'classic' && color?.startsWith('surface'))
    ) {
      if (descriptionColor) {
        descriptionStyle.text(descriptionColor);
      } else {
        descriptionStyle.text.on('surfaceVariant');
      }
    }

    const descriptionText = description && (
      <div
        className={`uui-menu-item-description ${getFontClass(appliedDescriptionFont)}`}
        style={descriptionStyle.get()}
      >
        {description}
      </div>
    );
    const contentText = (labelText ?? descriptionText) && (
      <div className="uui-menu-item-text">
        {labelText}
        {descriptionText}
      </div>
    );

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (__interactionsDisabled || disabled) {
        e?.preventDefault();
        return;
      }
      onClick?.(e);
      if (touchEffects.includes('ripple')) {
        if (menuItemRef.current && e) {
          createRipple(menuItemRef.current, e);
        }
      }
    };

    let resolvedColor =
      color ??
      (variant === 'modern' ? 'surfaceContainerLow' : 'surfaceContainer');
    if (type === 'option' && selected && selectedEffects.includes('color')) {
      resolvedColor =
        selectedColor ??
        (variant === 'modern' ? 'tertiaryContainer' : 'secondaryContainer');
    }

    const stateStyle = ControlStyle();
    stateStyle.bg.on(resolvedColor);

    const controlStyle = ControlStyle();
    controlStyle.bg(resolvedColor);
    if (textColor) {
      controlStyle.text(textColor);
    } else {
      controlStyle.text.on(resolvedColor);
    }

    const itemClasses = [
      'uui-menu-item',
      className,
      getDensityClass(density),
      disabled && 'uui-disabled',
      variant === 'modern' ? 'uui-menu-item-modern' : 'uui-menu-item-classic',
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedShape = getShapeClass(
      shape ?? (variant === 'modern' ? 'rounded' : 'smooth'),
    );
    const contentClasses = [
      'uui-menu-item-content',
      resolvedShape,
      ...(focusEffects.includes('ring') && active ? ['uui-focus-ring-in'] : []),
      ...(focusEffects.includes('overlay') && active
        ? ['uui-focus-overlay']
        : []),
      active && 'uui-active',
      active && focusVisible && 'uui-focus-visible',
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <div className={contentClasses} style={controlStyle.get()}>
        {visibleChildren.length > 0 ? (
          <div className="uui-menu-item-children">{visibleChildren}</div>
        ) : (
          <>
            {contentStart}
            {contentText}
            {contentEnd}
          </>
        )}
        <div
          className={['uui-state', resolvedShape].join(' ')}
          style={stateStyle.get()}
        />
      </div>
    );

    let role = 'menuitem';
    if (type === 'radio' || type === 'checkbox') {
      role = type === 'radio' ? 'menuitemradio' : 'menuitemcheckbox';
    }
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
      <div
        {...props}
        aria-checked={
          type === 'radio' || type === 'checkbox'
            ? (checked ?? false)
            : undefined
        }
        aria-disabled={disabled ? 'true' : undefined}
        aria-expanded={hasSubmenu ? expanded : undefined}
        aria-haspopup={hasSubmenu ? 'menu' : undefined}
        className={itemClasses}
        onClick={handleClick}
        ref={mergeRefs(menuItemRef, ref)}
        role={role}
        tabIndex={-1}
      >
        {content}
      </div>
    );
  },
);

type MenuItemComponent = ForwardRefExoticComponent<
  MenuItemProps & MenuItemInternalProps & RefAttributes<HTMLDivElement>
> & {
  [IS_MENU_ITEM]?: true;
};
/**
 * Marks this component as a MenuItem for runtime type guards.
 *
 * Used internally to identify Menu elements via a shared Symbol.
 * Not part of the public API.
 *
 * @internal
 */
(MenuItem as MenuItemComponent)[IS_MENU_ITEM] = true;
/**
 * Display name used by React DevTools.
 *
 * @internal
 */
MenuItem.displayName = 'MenuItem';
