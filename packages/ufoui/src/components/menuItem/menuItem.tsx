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
  ControlStyle,
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
  SurfaceColor,
} from '../../utils';
import { IS_MENU_ITEM } from './menuItem.guards';
import { isMenu } from '../menu/menu.guards';
import { Badge } from '../badge/badge';
import { MenuVariant } from '../menu/menu';
import {
  ArrowRightIcon,
  MenuCheckIcon,
  RadioCheckedIcon,
  RadioUncheckedIcon,
} from '../../assets';

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
          ? (checkedIcon ?? RadioCheckedIcon)
          : (uncheckedIcon ?? RadioUncheckedIcon);
      } else if (type === 'checkbox') {
        toggleIcon = checked ? (checkedIcon ?? MenuCheckIcon) : uncheckedIcon;
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
      hasSubmenu && !horizontal ? ArrowRightIcon : trailingElement;
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
