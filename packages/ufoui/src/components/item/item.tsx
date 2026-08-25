import React, {
    forwardRef,
    ForwardRefExoticComponent,
    ReactElement,
    ReactNode,
    RefAttributes,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';

import { ExpandIcon } from '../../assets';
import { SelectionContext } from '../../context';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';
import { Leading, Trailing } from '../../internal';
import { cn, createRipple, ElementDensity, getDensityClass, getFontClass, mergeRefs } from '../../utils';
import { IS_ITEM } from './item.guards';
import { ListSelection, ListSelectionSlot } from '../list/list';
import { Radio } from '../radio/radio';
import { Checkbox } from '../checkbox/checkbox';
import { Collapse } from '../collapse/collapse';

interface ItemCtxConfig {
    itemRole?: string;
    density?: ElementDensity;
    draggable?: boolean;
    nav?: ReturnType<typeof useFocusNavigation>;
    selection?: ListSelection;
    selectionSlot?: ListSelectionSlot;
}

export type ItemVariant = 'baseline' | 'expressive';

export type ItemMedia = 'image' | 'video';

/**
 * Props for the {@link ListItem} and {@link Option} components.
 *
 * @category Item
 */
export interface ItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'draggable'> {
    /** Nested items revealed while the item is expanded. */
    children?: React.ReactNode;

    /** Initial expanded state for uncontrolled usage. */
    defaultOpen?: boolean;

    /** Secondary supporting text. */
    description?: string;

    /** Disables interactions and focus. */
    disabled?: boolean;

    /** Makes the item a drag source. Overrides the value provided by the parent `List`. */
    draggable?: boolean;

    /** Leading slot content. */
    leading?: ReactNode;

    /** Primary label text. */
    label?: string;

    /** Type of media placed in the item slots. Adjusts their vertical padding. */
    media?: ItemMedia;

    /** Called whenever the expanded state changes. */
    onChange?: (open: boolean) => void;

    /** Controlled expanded state. */
    open?: boolean;

    /** Slot holding the selection marker. Overrides the value provided by the parent `List`. */
    selectionSlot?: ListSelectionSlot;

    /** Trailing slot content. */
    trailing?: ReactNode;

    /** Value identifier used for selection. */
    value?: string;

    /** Short text rendered above the primary label. */
    overline?: string;

    /** Visual variant */
    variant?: ItemVariant;

    expandIcon?: ReactElement;
}

/**
 * **Item** - dumb renderer for list, listbox and menu contexts.
 *
 * Reads ARIA role and density from {@link SelectionContext}. Registers
 * itself with the focus controller provided by the parent `List`.
 *
 * @remarks
 * Not exported from the package. Use the aliases instead: {@link ListItem} inside
 * {@link List}, {@link Option} inside {@link Select}.
 *
 * Items given `children` turn into expandable groups - the nested entries render inside a
 * {@link Collapse} and stay ordinary items, so they keep the focus controller and the selection
 * of the parent `List`. Groups nest, every level adds its own leading inset, and both controlled
 * (`open` + `onChange`) and uncontrolled (`defaultOpen`) modes are supported.
 *
 * @example
 * ```tsx
 * <List type="listbox" selection="single">
 *   <ListItem value="a" label="Apple" />
 *   <ListItem value="b" label="Banana" description="Yellow fruit" />
 * </List>
 * ```
 *
 * @function
 * @category Item
 * @internal
 */
export const Item = forwardRef<HTMLDivElement, ItemProps>(
    (
        {
            overline,
            label,
            description,
            leading,
            trailing,
            media,
            value,
            disabled,
            draggable,
            selectionSlot,
            className,
            children,
            defaultOpen,
            open,
            onChange,
            onClick,
            onKeyDown,
            expandIcon,
            ...props
        },
        ref
    ) => {
        const ctx = useContext(SelectionContext);
        const config = ctx?.config as ItemCtxConfig | undefined;
        const itemRef = useRef<HTMLDivElement>(null);
        const groupId = useId();
        const [internalOpen, setInternalOpen] = useState(!!defaultOpen);

        const selected = value ? (ctx?.values.includes(value) ?? false) : false;
        const expanded = open ?? internalOpen;
        const itemRole = config?.itemRole ?? 'listitem';
        const selection = config?.selection ?? 'none';
        const markerSlot = selectionSlot ?? config?.selectionSlot ?? 'leading';
        const canSelect = ctx && selection !== 'none' && !disabled && value;
        const canDrag = (draggable ?? config?.draggable) && !disabled;

        const markerControl =
            selection !== 'none' ? (
                selection === 'single' ? (
                    <Radio aria-hidden="true" checked={selected} readOnly tabIndex={-1} />
                ) : (
                    <Checkbox aria-hidden="true" checked={selected} readOnly tabIndex={-1} />
                )
            ) : null;

        useEffect(() => {
            const el = itemRef.current;
            if (!el || !config?.nav) {
                return;
            }
            config.nav.register(el);
            return () => config.nav?.unregister(el);
        }, [config?.nav]);

        const toggleOpen = () => {
            if (open === undefined) {
                setInternalOpen(!expanded);
            }
            onChange?.(!expanded);
        };

        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (disabled) {
                return;
            }
            if (canSelect) {
                ctx.toggle(value);
            }
            if (children) {
                toggleOpen();
            }
            onClick?.(e);
            if (itemRef.current) {
                createRipple(itemRef.current, e);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            config?.nav?.onKeyDown(e);
            if ((e.key === 'Enter' || e.key === ' ') && (canSelect || children)) {
                e.preventDefault();
                if (canSelect) {
                    ctx.toggle(value);
                }
                if (children) {
                    toggleOpen();
                }
            }
            onKeyDown?.(e);
        };

        const expander = children ? (expandIcon ?? ExpandIcon) : null;
        const trailingEnd =
            markerSlot === 'trailing' ? (
                <>
                    {expander}
                    {markerControl}
                </>
            ) : (
                expander
            );

        return (
            <>
                <div
                    {...props}
                    aria-controls={children ? groupId : undefined}
                    aria-disabled={disabled || undefined}
                    aria-expanded={children ? expanded : undefined}
                    aria-selected={selected}
                    className={cn(
                        'uui-item',
                        getDensityClass(config?.density),
                        media && `uui-media-${media}`,
                        selected && 'uui-selected',
                        disabled && 'uui-disabled',
                        children && expanded && 'uui-open',
                        className
                    )}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    ref={mergeRefs(itemRef, ref)}
                    role={itemRole}
                    tabIndex={disabled ? -1 : 0}>
                    <Leading content={leading} start={markerSlot === 'leading' ? markerControl : undefined} />
                    <div className="uui-item-text">
                        {overline && (
                            <div className={cn('uui-item-overline', getFontClass('labelMedium'))}>{overline}</div>
                        )}
                        {label && <div className={cn('uui-item-label', getFontClass('bodyLarge'))}>{label}</div>}
                        {description && (
                            <div className={cn('uui-item-description', getFontClass('bodyMedium'))}>{description}</div>
                        )}
                    </div>
                    <Trailing content={trailing} end={trailingEnd} />
                </div>
                {children && (
                    <Collapse className="uui-item-group" direction="col" id={groupId} open={expanded}>
                        {children}
                    </Collapse>
                )}
            </>
        );
    }
);

type ItemComponent = ForwardRefExoticComponent<ItemProps & RefAttributes<HTMLDivElement>> & {
    [IS_ITEM]?: true;
};

(Item as ItemComponent)[IS_ITEM] = true;
Item.displayName = 'Item';
