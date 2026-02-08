import React, {
    cloneElement,
    forwardRef,
    ForwardRefExoticComponent,
    HTMLAttributes,
    isValidElement,
    ReactElement,
    ReactNode,
    RefAttributes,
    RefObject,
    useEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

import {
    ElementAlign,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFocusEffect,
    ElementFont,
    ElementSelectedEffect,
    ElementShape,
    ElementTouchEffect,
    getBorderClass,
    getDensityClass,
    getElevationClass,
    getShapeClass,
    mergeRefs,
    uniqueID,
} from '@ufoui/utils';
import { MotionAnimation, motionClassMap, MotionStyle } from '@ufoui/types';
import { MenuItemInternalProps, MenuItemProps } from '@ufoui/core';
import { DividerProps } from '@ufoui/core';
import { isMenuItem } from '@ufoui/core';
import { isDivider } from '@ufoui/core';
import { IS_MENU, isMenu } from './menu.guards';

import { BorderColor, ControlStyle, getBorderColor, inverseColorMap, SurfaceColor } from '../../utils/color';
import { calculateFloatingPosition, ElementFloatingMode } from '../../utils/calculateFloatingPosition';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useFocusVisible } from '../../hooks/useFocusVisible';

/**
 * Visual style preset for the Menu component.
 *
 * - `modern` – MD3 menu (expressive).
 * - `classic` – MD3 menu (baseline).
 *
 * @category Menu
 */
export type MenuVariant = 'modern' | 'classic';

/**
 * Animation setting for the Menu component.
 *
 * - `auto` – resolves to the default animation (`"scale"`).
 * - `none` – disables all animations.
 * - `MotionAnimation` – any supported motion animation type.
 *
 * @category Menu
 */
export type MenuAnimation = 'auto' | 'none' | MotionAnimation;

/**
 * Props for the {@link Menu} component.
 *
 * @category Menu
 */
export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Reference to the trigger element used for positioning. */
    anchorRef?: RefObject<HTMLElement> | null;

    /** Animation setting (`auto`, `none`, or motion animation type). */
    animation?: MenuAnimation;

    /** Border width (0–4). */
    border?: ElementBorder;

    /** Border color token. */
    borderColor?: BorderColor;

    /** Icon used for checked checkbox items. */
    checkedIcon?: ReactNode;

    /** Menu items. Must be `MenuItem` or compatible custom nodes. */
    children?: ReactNode;

    /** Whether menu closes automatically on item change. */
    closeOnChange?: boolean;

    /** Surface background token for the menu container. */
    color?: SurfaceColor;

    /** Density preset (`comfortable`, `compact`, `dense`). */
    density?: ElementDensity;

    /** Text color for item descriptions. */
    descriptionColor?: SurfaceColor;

    /** Font token applied to menu item descriptions. */
    descriptionFont?: ElementFont;

    /** Enables docked positioning mode. */
    docked?: boolean;

    /** Elevation level of the menu surface when docked. */
    dockedElevation?: ElementElevation;

    /** Duration (ms) of open/close animation. Default: 250 */
    duration?: number;

    /** Elevation level of the menu surface. */
    elevation?: ElementElevation;

    /** Reserves leading slot for all menu items. */
    fixedLeading?: boolean;

    /** Floating behaviour mode (`menu`, `submenu`, `dropdown`, `tooltip`). */
    floatingMode?: ElementFloatingMode;

    /** Alias for labelFont */
    font?: ElementFont;

    /** Enables horizontal menu layout. */
    horizontal?: boolean;

    /** Focus effects applied to menu items. */
    itemFocusEffects?: ElementFocusEffect[];

    /** Selected state effects applied to menu items. */
    itemSelectedEffects?: ElementSelectedEffect[];

    /** Touch and click feedback effects for menu items. */
    itemTouchEffects?: ElementTouchEffect[];

    /** Text color for item labels. */
    labelColor?: SurfaceColor;

    /** Font token applied to menu item primary labels. */
    labelFont?: ElementFont;

    /** Motion style variant (expressive or regular). */
    motionStyle?: MotionStyle;

    /** Offset (px) between menu and anchor. @default 4 */
    offset?: number;

    /** Callback fired when the menu requests to close. */
    onClose?: () => void;

    /** Controls visibility of the menu. */
    open?: boolean;

    /** Opens the menu on pointer hover. */
    openOnHover?: boolean;

    /** Preferred placement relative to the anchor. */
    placement?: ElementAlign;

    /** Icon used for checked radio items. */
    radioCheckedIcon?: ReactNode;

    /** Icon used for unchecked radio items. */
    radioUncheckedIcon?: ReactNode;

    /** Background color used for selected items. */
    selectedColor?: SurfaceColor;

    /** Shape token controlling menu corner rounding. */
    shape?: ElementShape;

    /** Text color for shortcut labels. */
    shortcutColor?: SurfaceColor;

    /** Font token applied to menu item shortcut labels. */
    shortcutFont?: ElementFont;

    /** Overrides automatic text color. */
    textColor?: SurfaceColor;

    /** Icon used for unchecked checkbox items. */
    uncheckedIcon?: ReactNode;

    /** Visual preset (`modern` = MD3 expressive, `classic` = MD3 baseline). */
    variant?: MenuVariant;
}

/**
 * Internal props used for nested and recursive menu rendering.
 *
 * These props are injected automatically by the Menu system
 * and must not be provided manually.
 *
 * @category Menu
 * @internal
 */
export interface MenuInternalProps {
    /** Closes the root menu instance. */
    __closeRootMenu?: () => void;

    /** Shared group identifier for nested menus. */
    __groupId?: string;

    /** Horizontal nesting depth for keyboard navigation. */
    __horizontalDepth?: number;

    /** Nesting depth of the menu tree (0 = root). */
    __level?: number;

    /** Handles horizontal navigation between sibling menus. */
    __navigateHorizontal?: (goNext: boolean) => void;
}

/**
 * Resolves menu animation setting to a concrete motion animation.
 *
 * - `none` → disables animation
 * - `auto` → resolves to default animation (`scale`)
 * - otherwise returns the provided animation value
 *
 * @internal
 */
const resolveAnimation = (animation: MenuAnimation) => {
    if (animation === 'none') {
        return 'none';
    }
    return animation === 'auto' ? 'scale' : animation;
};

/**
 * Internal lifecycle state of the Menu component.
 *
 * @category Menu
 * @internal
 */
type MenuState = 'closed' | 'opening' | 'opened' | 'closing';

/**
 * **Menu** - menu component with optional docking and multi-level submenus.
 *
 * Renders a menu component following the MD3 specification.
 * The menu can be positioned relative to an anchor element using floating
 * layout logic or rendered in a docked mode without floating positioning.
 *
 * Supports nested submenus, keyboard navigation,
 * motion configuration, density presets, elevation, shape, borders
 * and two MD3 visual variants (`modern`, `classic`).
 *
 *
 * @param props
 *
 * @example
 * ```tsx
 * <Menu open anchorRef={buttonRef}>
 *   <MenuItem label="Open" />
 *   <Divider/>
 *   <MenuItem label="Save" />
 * </Menu>
 * ```
 *
 * @example
 * ```tsx
 * <Menu open docked>
 *   <MenuItem label="Settings" />
 *   <MenuItem label="Logout" />
 * </Menu>
 * ```
 *
 * @example
 * ```tsx
 * <Menu open>
 *   <MenuItem label="View">
 *     <Menu>
 *       <MenuItem label="Zoom in" />
 *       <MenuItem label="Zoom out" />
 *     </Menu>
 *   </MenuItem>
 * </Menu>
 * ```
 *
 * @category Menu
 * @function
 */

export const Menu = forwardRef<HTMLDivElement, MenuProps & MenuInternalProps>(
    (
        {
            anchorRef,
            open = false,
            horizontal = false,
            placement = 'auto',
            floatingMode,
            offset = 4,
            color,
            elevation,
            dockedElevation,
            shape,
            border,
            borderColor,
            className,
            children,
            style,
            id,
            onClose,
            variant = 'classic',
            animation = 'scale',
            duration,
            motionStyle = 'regular',
            fixedLeading,
            density,
            __level,
            __groupId,
            __closeRootMenu,
            __navigateHorizontal,
            __horizontalDepth,
            docked,
            textColor,
            descriptionColor,
            labelColor,
            shortcutColor,
            uncheckedIcon,
            checkedIcon,
            radioUncheckedIcon,
            radioCheckedIcon,
            selectedColor,
            itemTouchEffects,
            itemSelectedEffects,
            itemFocusEffects,
            closeOnChange = false,
            openOnHover = true,
            labelFont,
            font,
            descriptionFont,
            shortcutFont,
            ...props
        },
        ref
        // eslint-disable-next-line sonarjs/cognitive-complexity
    ) => {
        const stateRef = useRef<MenuState>('closed');
        const [submenuIndex, setSubmenuIndex] = useState<number>(-1);
        const [activeIndex, setActiveIndex] = useState<number>(-1);
        const [focused, setFocused] = useState(false);
        const focusVisible = useFocusVisible();
        const level = __level ?? 0;
        const internalGroup = useRef(id ?? uniqueID('menu')).current;
        const groupId = __groupId ?? internalGroup;
        const menuRef = useRef<HTMLDivElement>(null);
        const activeItemRef = useRef<HTMLDivElement | null>(null);
        const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
        const active = submenuIndex === -1;
        const [visible, setVisible] = useState(false);
        const [animating, setAnimating] = useState(false);
        const [reverse, setReverse] = useState<'normal' | 'reverse'>('normal');
        const [closingSubmenu, setClosingSubmenu] = useState(false);
        const [pendingSubmenu, setPendingSubmenu] = useState(-1);
        const containerColor: SurfaceColor =
            color ?? (variant === 'modern' ? 'surfaceContainerLow' : 'surfaceContainer');
        const containerElevation: ElementElevation =
            (docked ? dockedElevation : undefined) ?? elevation ?? (variant === 'modern' ? 3 : 2);

        const [interactionsDisabled, setInteractionsDisabled] = useState(false);
        const aniDuration = animation !== 'none' ? (duration ?? 220) : 0;
        const openDuration = docked ? 0 : aniDuration;
        const openTimerRef = useRef<number | null>(null);
        const closeTimerRef = useRef<number | null>(null);
        const submenuVisible = submenuIndex !== -1;

        type MenuElement = ReactElement<MenuItemProps & MenuItemInternalProps> & ReactElement<DividerProps>;
        function isMenuElement(el: React.ReactNode): el is MenuElement {
            return isMenuItem(el) || isDivider(el);
        }

        const menuItems = React.Children.toArray(children).filter(isMenuElement) as ReactElement[];

        const enabledItemsIndexes = menuItems.reduce<number[]>((acc, item, index) => {
            if (isMenuItem(item)) {
                if (!item.props.disabled) {
                    acc.push(index);
                }
            }
            return acc;
        }, []);

        // closes submenu - passed down as onClose
        function _closeSubmenu() {
            if (submenuVisible) {
                setInteractionsDisabled(true);
                setSubmenuIndex(-1);
            }
        }

        // closes active menu
        function closeActiveMenu() {
            onClose?.();
            if (!onClose && submenuVisible) {
                _closeSubmenu();
                setActiveIndex(-1);
            }
            if (level === 0 && anchorRef?.current) {
                anchorRef.current.focus();
            }
        }

        // closes root menu - passed down
        function _closeRootMenu() {
            if (__closeRootMenu) {
                __closeRootMenu();
            } else {
                closeActiveMenu();
            }
        }

        function getMenuItemElement(itemIndex: number) {
            if (!menuRef.current || itemIndex === -1) {
                return null;
            }

            return menuRef.current.querySelector<HTMLDivElement>(`[data-menu-index="${String(itemIndex)}"]`);
        }

        function getSubmenuItems(targetIndex: number) {
            const itemChildren = React.Children.toArray(menuItems[targetIndex].props.children);
            const submenu = itemChildren.find(child => isMenu(child));

            if (!isValidElement(submenu)) {
                return;
            }

            const itemSubmenuChildren = React.Children.toArray(submenu.props.children);
            return itemSubmenuChildren.filter(el => isDivider(el) || isMenuElement(el)) as ReactElement[];
        }
        function openSubmenu(targetIndex: number) {
            if (targetIndex === -1) {
                return;
            }

            const itemPos = enabledItemsIndexes.indexOf(targetIndex);
            if (itemPos === -1) {
                return;
            }

            if (submenuVisible) {
                setPendingSubmenu(targetIndex);
                _closeSubmenu();
                return;
            }

            const submenuItems = getSubmenuItems(targetIndex);
            if (!submenuItems || submenuItems.length === 0) {
                return;
            }

            const el = getMenuItemElement(targetIndex);
            if (!el) {
                return;
            }
            activeItemRef.current = el;
            setInteractionsDisabled(true);
            setSubmenuIndex(targetIndex);

            setTimeout(() => {
                setInteractionsDisabled(false);
            }, aniDuration);
        }

        function hasSubmenu(itemIndex: number) {
            if (itemIndex < 0) {
                return false;
            }

            const itemChildren = React.Children.toArray(menuItems[itemIndex].props.children) as React.ReactElement[];
            return itemChildren.some(child => isMenu(child));
        }

        function _navigateHorizontal(goNext: boolean) {
            if (activeIndex === -1) {
                return;
            }
            const itemPos = enabledItemsIndexes.indexOf(activeIndex);
            if (itemPos === -1) {
                return;
            }
            let targetIndex;
            if (goNext) {
                targetIndex = enabledItemsIndexes[itemPos + 1 < enabledItemsIndexes.length ? itemPos + 1 : 0];
            } else {
                targetIndex =
                    itemPos > 0
                        ? enabledItemsIndexes[itemPos - 1]
                        : enabledItemsIndexes[enabledItemsIndexes.length - 1];
            }
            if (targetIndex !== activeIndex) {
                setActiveIndex(targetIndex);
                if (hasSubmenu(targetIndex)) {
                    openSubmenu(targetIndex);
                } else {
                    _closeSubmenu();
                }
            }
        }

        // submenu close 1
        useEffect(() => {
            if (!submenuVisible) {
                setTimeout(() => {
                    setClosingSubmenu(true);
                }, aniDuration * 0.67);
            }
        }, [aniDuration, submenuVisible]);

        // submenu close 2
        useEffect(() => {
            if (!submenuVisible && closingSubmenu) {
                setClosingSubmenu(false);
                setSubmenuIndex(-1);

                if (pendingSubmenu !== -1) {
                    setPendingSubmenu(-1);
                    openSubmenu(pendingSubmenu);
                } else {
                    menuRef.current?.focus();
                }
                setInteractionsDisabled(false);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [closingSubmenu, pendingSubmenu, submenuVisible]);

        // open 1 / close 1
        useEffect(() => {
            if (open) {
                stateRef.current = 'opening';
                setInteractionsDisabled(true);
                setReverse('normal');
                setVisible(true);
                setSubmenuIndex(-1);
                setAnimating(false);
                setActiveIndex(-1);
            } else {
                stateRef.current = 'closing';
                setInteractionsDisabled(true);
                setAnimating(false);
                setReverse('reverse');
            }
        }, [open]);

        // open 2 - position
        useEffect(() => {
            if (!open || !visible || !menuRef.current) {
                return;
            }

            const update = () => {
                const resolvedFloatingMode = floatingMode ?? (horizontal ? 'dropdown' : 'menu');
                if (anchorRef?.current) {
                    const pos = calculateFloatingPosition(anchorRef, menuRef, {
                        placement,
                        mode: resolvedFloatingMode,
                        offset,
                    });
                    if (pos) {
                        setPosition({ x: pos.x, y: pos.y });
                    }
                }
            };
            if (docked) {
                setPosition({ x: 0, y: 0 });
            } else {
                window.addEventListener('resize', update);
                update();
            }
            setAnimating(true);
            return () => {
                if (!docked) {
                    window.removeEventListener('resize', update);
                }
            };
        }, [anchorRef, docked, floatingMode, horizontal, offset, open, placement, visible]);

        // open 3 - after animation
        useEffect(() => {
            if (open && visible && position) {
                setTimeout(() => {
                    if (stateRef.current === 'opening') {
                        setInteractionsDisabled(false);
                        stateRef.current = 'opened';
                        if (!docked) {
                            menuRef.current?.focus();
                        }
                        if (focusVisible) {
                            setActiveIndex(enabledItemsIndexes[0] ?? -1);
                        } else {
                            setActiveIndex(-1);
                        }
                    }
                }, openDuration);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [open, position, visible]);

        // close 2
        useEffect(() => {
            if (reverse === 'reverse' && stateRef.current === 'closing') {
                setAnimating(true);
                setActiveIndex(-1);
                setTimeout(() => {
                    if (stateRef.current === 'closing') {
                        stateRef.current = 'closed';
                        setVisible(false);
                        setPosition(null);
                        setInteractionsDisabled(false);
                    }
                }, aniDuration * 0.67);
            }
        }, [aniDuration, reverse]);

        // aria temporary item focus & autoscroll
        useEffect(() => {
            if (activeIndex < 0 || !focused || stateRef.current !== 'opened') {
                return;
            }
            const itemEl = getMenuItemElement(activeIndex);
            if (!itemEl) {
                return;
            }
            itemEl.focus({ preventScroll: true });
            itemEl.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
            });

            setTimeout(() => {
                menuRef.current?.focus({ preventScroll: true });
            }, 0);
        }, [activeIndex, focused]);

        useEffect(() => {
            if (focused && focusVisible && activeIndex === -1 && stateRef.current === 'opened') {
                if (enabledItemsIndexes.length > 0) {
                    setActiveIndex(enabledItemsIndexes[0]);
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [activeIndex, focusVisible, focused]);

        function handleFocus(_: React.FocusEvent<HTMLDivElement>) {
            setFocused(true);
        }

        useClickOutside(
            open && level === 0,
            `[data-menu-group="${groupId}"]`,
            () => {
                _closeRootMenu();
            },
            anchorRef
        );

        function triggerSelect(itemIndex: number) {
            const targetIndex = itemIndex;
            if (targetIndex === -1) {
                return;
            }

            if (menuItems[targetIndex].props.disabled) {
                return;
            }
            setActiveIndex(targetIndex);
            if (hasSubmenu(targetIndex)) {
                if (submenuVisible && targetIndex === submenuIndex) {
                    _closeSubmenu();
                } else {
                    openSubmenu(targetIndex);
                }
            } else if (
                menuItems[targetIndex].props.type === 'radio' ||
                menuItems[targetIndex].props.type === 'checkbox' ||
                menuItems[targetIndex].props.type === 'option'
            ) {
                menuItems[targetIndex].props.onChange?.();
                if (closeOnChange) {
                    _closeRootMenu();
                }
            } else {
                menuItems[targetIndex].props.onClick?.();
                _closeRootMenu();
            }
        }

        function handleItemClick(e: React.MouseEvent<HTMLDivElement>, itemIndex: number) {
            if (interactionsDisabled) {
                e?.preventDefault();
                return;
            }
            triggerSelect(itemIndex);
        }

        function handleMouseEnter(_: React.MouseEvent<HTMLDivElement>, itemIndex: number) {
            if (!openOnHover || (focusVisible && focused)) {
                return;
            }

            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
            }

            if (openTimerRef.current) {
                clearTimeout(openTimerRef.current);
                openTimerRef.current = null;
            }

            if (!hasSubmenu(itemIndex)) {
                if (submenuVisible) {
                    closeTimerRef.current = window.setTimeout(() => {
                        _closeSubmenu();
                    }, 150);
                }
                return;
            }

            if (submenuVisible && submenuIndex === itemIndex) {
                return;
            }

            openTimerRef.current = window.setTimeout(() => {
                setActiveIndex(itemIndex);
                openSubmenu(itemIndex);
            }, 150);
        }

        function handleMouseLeave() {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
            }
            if (openTimerRef.current) {
                clearTimeout(openTimerRef.current);
                openTimerRef.current = null;
            }
        }

        const hasFixedLeading = menuItems.some(
            item =>
                item.props.icon !== undefined ||
                item.props.leading !== undefined ||
                item.props.type === 'radio' ||
                item.props.type === 'checkbox'
        );

        const clonedChildren = menuItems.map((child, index) => {
            if (isMenuItem(child)) {
                const overriddenProps: MenuItemInternalProps & MenuItemProps = {
                    'data-menu-index': index,
                    __interactionsDisabled: interactionsDisabled,
                    __index: index,
                    disabled: child.props.disabled,
                    active: index === activeIndex && focused,
                    focusVisible: focusVisible && focused,
                    horizontal: horizontal,
                    expanded: submenuVisible && submenuIndex === index,
                    fixedLeading: child.props.fixedLeading ?? (fixedLeading && hasFixedLeading),
                    variant: child.props.variant ?? variant,
                    shape: child.props.shape ?? shape,
                    color: child.props.color ?? color,
                    density: child.props.density ?? density,
                    shortcutColor: child.props.shortcutColor ?? shortcutColor,
                    textColor: child.props.textColor ?? textColor,
                    labelColor: child.props.labelColor ?? labelColor,
                    descriptionColor: child.props.descriptionColor ?? descriptionColor,
                    checkedIcon:
                        child.props.checkedIcon ?? (child.props.type === 'checkbox' ? checkedIcon : radioCheckedIcon),
                    uncheckedIcon:
                        child.props.uncheckedIcon ??
                        (child.props.type === 'checkbox' ? uncheckedIcon : radioUncheckedIcon),
                    selectedColor: child.props.selectedColor ?? selectedColor,
                    touchEffects: child.props.touchEffects ?? itemTouchEffects,
                    selectedEffects: child.props.selectedEffects ?? itemSelectedEffects,
                    focusEffects: child.props.focusEffects ?? itemFocusEffects,
                    labelFont: child.props.labelFont ?? labelFont,
                    font: child.props.font ?? font,
                    descriptionFont: child.props.descriptionFont ?? descriptionFont,
                    shortcutFont: child.props.shortcutFont ?? shortcutFont,
                    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                        handleItemClick(e, index);
                    },
                    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
                        handleMouseEnter(e, index);
                    },
                    onMouseLeave: (_: React.MouseEvent<HTMLDivElement>) => {
                        handleMouseLeave();
                    },
                };
                return cloneElement(child, {
                    ...child.props,
                    ...overriddenProps,
                });
            } else if (isDivider(child)) {
                const dividerColor = (
                    inverseColorMap[containerColor] === 'onSurface' ? 'outlineVariant' : inverseColorMap[containerColor]
                ) as BorderColor;
                const overriddenProps: DividerProps = {
                    borderColor: child.props.borderColor ?? child.props.color ?? dividerColor,
                    vertical: horizontal,
                    insetSize: child.props.insetSize ?? 8,
                    spacing: child.props.spacing ?? (variant === 'modern' ? 5 : 8),
                    inset: child.props.inset ?? (variant === 'modern' ? 'middle' : undefined),
                };
                return cloneElement(child, { ...child.props, ...overriddenProps });
            }
            return cloneElement(child, {
                ...child.props,
            });
        });

        function handleMenuClick(e: React.MouseEvent<HTMLDivElement>) {
            if ((e.target as HTMLElement).closest('[data-menu-index]')) {
                return;
            }
            if (submenuVisible) {
                _closeSubmenu();
            }
        }

        // eslint-disable-next-line sonarjs/cognitive-complexity
        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (!open || interactionsDisabled) {
                return;
            }
            let realKey = e.key;

            if (horizontal) {
                const horizontalKeys: Record<string, string> = {
                    ArrowDown: 'ArrowRight',
                    ArrowUp: 'ArrowLeft',
                    ArrowRight: 'ArrowDown',
                    ArrowLeft: 'ArrowUp',
                };
                realKey = horizontalKeys[realKey] ? horizontalKeys[realKey] : realKey;
            }

            if (enabledItemsIndexes.length === 0 && realKey !== 'Tab') {
                return;
            }
            const itemPos = enabledItemsIndexes.indexOf(activeIndex);
            let targetIndex;
            switch (realKey) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (activeIndex === -1 || itemPos === -1) {
                        targetIndex = enabledItemsIndexes[enabledItemsIndexes.length - 1];
                    } else {
                        targetIndex =
                            itemPos > 0
                                ? enabledItemsIndexes[itemPos - 1]
                                : enabledItemsIndexes[enabledItemsIndexes.length - 1];
                    }
                    setActiveIndex(targetIndex);
                    if (horizontal && hasSubmenu(targetIndex)) {
                        openSubmenu(targetIndex);
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (activeIndex === -1 || itemPos === -1) {
                        // eslint-disable-next-line prefer-destructuring
                        targetIndex = enabledItemsIndexes[0];
                    } else {
                        targetIndex = enabledItemsIndexes[itemPos + 1 < enabledItemsIndexes.length ? itemPos + 1 : 0];
                    }
                    setActiveIndex(targetIndex);
                    if (horizontal && hasSubmenu(targetIndex)) {
                        openSubmenu(targetIndex);
                    }
                    break;
                case 'Home':
                    setActiveIndex(enabledItemsIndexes[0]);
                    break;
                case 'End':
                    setActiveIndex(enabledItemsIndexes[enabledItemsIndexes.length - 1]);
                    break;
                case 'Enter':
                case ' ':
                    e.stopPropagation();
                    e.preventDefault();
                    if (itemPos >= 0) {
                        triggerSelect(enabledItemsIndexes[itemPos]);
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();

                    if (itemPos >= 0 && hasSubmenu(enabledItemsIndexes[itemPos])) {
                        openSubmenu(enabledItemsIndexes[itemPos]);
                    } else if (__navigateHorizontal) {
                        __navigateHorizontal(true);
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (__navigateHorizontal && __horizontalDepth === 1) {
                        __navigateHorizontal(false);
                    } else {
                        closeActiveMenu();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    closeActiveMenu();
                    break;
                case 'Tab':
                    if (!docked) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    _closeRootMenu();
                    break;
            }
        };

        if ((!open && !visible) || (!anchorRef && !docked)) {
            return null;
        }

        // ---------------------------------------------------------------
        // STYLE + CLASSES
        // ---------------------------------------------------------------
        const animationStyle = {
            '--uui-reverse': reverse,
            '--uui-duration': reverse === 'reverse' ? String(openDuration * 0.67) + 'ms' : String(openDuration) + 'ms',
        } as React.CSSProperties;

        const resolvedAnimation = resolveAnimation(animation);
        const animationClass = resolvedAnimation === 'none' ? '' : motionClassMap[resolvedAnimation];
        const motionStyleClass = motionStyle === 'expressive' ? 'uui-motion-expressive' : '';

        const ctrlStyle = ControlStyle({ ...style, ...animationStyle });
        ctrlStyle.bg(containerColor);
        ctrlStyle.text.on(containerColor);

        if (border && +border > 0) {
            ctrlStyle.border(getBorderColor(borderColor));
        }

        const classes = [
            'uui-menu',
            `uui-menu-level-${String(level)}`,
            horizontal && 'uui-menu-horizontal',
            active && 'uui-menu-active',
            variant === 'modern' ? 'uui-menu-modern' : 'uui-menu-classic',
            animating && animationClass,
            motionStyleClass,
            getDensityClass(density),
            getShapeClass(shape ?? (variant === 'modern' ? 'rounded' : 'smooth')),
            getElevationClass(containerElevation),
            border !== undefined ? getBorderClass(border) : null,
            className,
        ]
            .filter(Boolean)
            .join(' ');

        const menu = (
            <div
                aria-orientation={horizontal ? 'horizontal' : 'vertical'}
                className={classes}
                data-menu-group={groupId}
                id={id}
                onBlur={() => {
                    setFocused(false);
                }}
                onClick={handleMenuClick}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                ref={mergeRefs(ref, menuRef)}
                role="menu"
                style={{
                    position: docked ? 'relative' : 'fixed',
                    left: position?.x ?? 0,
                    top: position?.y ?? 0,
                    zIndex: 9999,
                    visibility: position ? 'visible' : 'hidden',
                    ...ctrlStyle.get(),
                }}
                tabIndex={0}
                {...props}>
                <div className="uui-menu-scroll">{clonedChildren}</div>
            </div>
        );
        const portalTarget = document.getElementById('menu-root') ?? document.body;

        let submenuChildren = null;
        if (submenuIndex !== -1) {
            const submenu = getSubmenuItems(submenuIndex);
            if (submenu && submenu.length > 0) {
                submenuChildren = submenu;
            }
        }
        const portal = createPortal(
            <>
                {!docked && menu}
                {activeItemRef.current && submenuIndex !== -1 && (
                    <Menu
                        __closeRootMenu={__closeRootMenu ?? _closeRootMenu}
                        __groupId={groupId}
                        __horizontalDepth={horizontal ? 1 : __horizontalDepth && __horizontalDepth + 1}
                        __level={level + 1}
                        __navigateHorizontal={horizontal ? _navigateHorizontal : __navigateHorizontal}
                        anchorRef={activeItemRef}
                        animation={animation}
                        aria-orientation="vertical"
                        border={border}
                        borderColor={borderColor}
                        checkedIcon={checkedIcon}
                        closeOnChange={closeOnChange}
                        color={containerColor}
                        density={density}
                        descriptionColor={descriptionColor}
                        descriptionFont={descriptionFont}
                        duration={duration}
                        elevation={elevation}
                        fixedLeading={fixedLeading}
                        floatingMode={horizontal ? 'menu' : 'submenu'}
                        font={font}
                        itemFocusEffects={itemFocusEffects}
                        itemSelectedEffects={itemSelectedEffects}
                        itemTouchEffects={itemTouchEffects}
                        labelColor={labelColor}
                        labelFont={labelFont}
                        motionStyle={motionStyle}
                        offset={0}
                        onClose={_closeSubmenu}
                        open={open && submenuVisible}
                        openOnHover={openOnHover}
                        placement="auto"
                        radioCheckedIcon={radioCheckedIcon}
                        radioUncheckedIcon={radioUncheckedIcon}
                        role="menu"
                        selectedColor={selectedColor}
                        shape={shape}
                        shortcutColor={shortcutColor}
                        shortcutFont={shortcutFont}
                        textColor={textColor}
                        uncheckedIcon={uncheckedIcon}
                        variant={variant}>
                        {submenuChildren}
                    </Menu>
                )}
            </>,
            portalTarget
        );
        return docked && level === 0 ? (
            <>
                {menu}
                {portal}
            </>
        ) : (
            portal
        );
    }
);

type MenuComponent = ForwardRefExoticComponent<
    MenuItemProps & MenuItemInternalProps & RefAttributes<HTMLDivElement>
> & {
    [IS_MENU]?: true;
};
/**
 * Marks this component as a Menu for runtime type guards.
 *
 * Used internally to identify Menu elements via a shared Symbol.
 * Not part of the public API.
 *
 * @internal
 */
(Menu as MenuComponent)[IS_MENU] = true;
/**
 * Display name used by React DevTools.
 *
 * @internal
 */
Menu.displayName = 'Menu';
