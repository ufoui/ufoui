import React, {
    cloneElement,
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

import { CheckIcon, KeyboardArrowDownIcon } from '../../assets';
import { SelectionContext } from '../../context';
import { Leading, Trailing } from '../../internal';
import {
    cn,
    ControlStyle,
    createRipple,
    ElementShape,
    getDensityClass,
    getEffects,
    getOnColorName,
    getShapeClass,
    mergeRefs,
    SurfaceColor,
} from '../../utils';
import { IS_ITEM } from './item.guards';
import { ListConfig, ListSelectionMarker, ListSelectionSlot } from '../list/list';
import { Radio } from '../radio/radio';
import { Checkbox } from '../checkbox/checkbox';
import { Switch } from '../switch/switch';
import { Collapse } from '../collapse/collapse';

export type ItemVariant = 'baseline' | 'expressive';

export type ItemMedia = 'image' | 'video';

/**
 * Props for the {@link ListItem}, {@link Option} and {@link TreeItem} components.
 *
 * @category Item
 */
export interface ItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'draggable'> {
    /** Nested items revealed while the item is expanded. */
    children?: React.ReactNode;

    /** Text block content, rendered between the leading and trailing slots. Replaces `overline`, `label` and `description`. */
    content?: ReactNode;

    /** Initial expanded state for uncontrolled usage. */
    defaultOpen?: boolean;

    /** Secondary supporting text. */
    description?: string;

    /** Disables interactions and focus. Overrides the value provided by the parent `List`. */
    disabled?: boolean;

    /** Makes the item a drag source. Overrides the value provided by the parent `List`. */
    draggable?: boolean;

    /** Releases the `icon` marker space while unselected. Overrides the value provided by the parent `List`. */
    fluidMarker?: boolean;

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

    /** Background color used when selected. Overrides the value provided by the parent `List`. */
    selectedColor?: SurfaceColor;

    /** Shape override when selected. Overrides the value provided by the parent `List`. */
    selectedShape?: ElementShape;

    /** Selection marker kind. Overrides the value provided by the parent `List`. */
    selectionMarker?: ListSelectionMarker;

    /** Slot holding the selection marker. Overrides the value provided by the parent `List`. */
    selectionSlot?: ListSelectionSlot;

    /** Corner shape of the item. Overrides the value provided by the parent `List`. */
    shape?: ElementShape;

    /** Trailing slot content. */
    trailing?: ReactNode;

    /** Value identifier used for selection. */
    value?: string;

    /** Short text rendered above the primary label. */
    overline?: string;

    /** Visual variant. Overrides the value provided by the parent `List`. Default: `'baseline'`. */
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
 * {@link List}, {@link Option} inside {@link Select}, {@link TreeItem} inside {@link Tree}.
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
            selectedColor,
            selectedShape,
            overline,
            label,
            description,
            content,
            leading,
            trailing,
            media,
            value,
            disabled,
            draggable,
            fluidMarker,
            selectionMarker,
            selectionSlot,
            shape,
            className,
            children,
            defaultOpen,
            open,
            onChange,
            onClick,
            onKeyDown,
            expandIcon,
            variant,
            style,
            'aria-label': ariaLabel,
            ...props
        },
        ref
    ) => {
        const ctx = useContext(SelectionContext);
        const config = ctx?.config as ListConfig | undefined;
        const itemRef = useRef<HTMLDivElement>(null);
        const groupId = useId();
        const [internalOpen, setInternalOpen] = useState(!!defaultOpen);

        const finalDisabled = disabled ?? config?.disabled;
        const finalFluidMarker = fluidMarker ?? config?.fluidMarker;
        const finalVariant = variant ?? config?.variant ?? 'baseline';
        const finalShape = shape ?? config?.shape ?? (finalVariant === 'expressive' ? 'rounded' : 'square');
        const selected = value ? (ctx?.values.includes(value) ?? false) : false;
        const expanded = open ?? internalOpen;
        const itemRole = config?.itemRole ?? 'listitem';
        const selection = config?.selection ?? 'none';
        const marker = selectionMarker ?? config?.selectionMarker ?? 'auto';
        const markerSlot = selectionSlot ?? config?.selectionSlot ?? (finalVariant === 'baseline' ? 'leading' : 'none');
        const canSelect = ctx && selection !== 'none' && !finalDisabled && value;
        const canDrag = (draggable ?? config?.draggable) && !finalDisabled;
        const finalEffects = getEffects(config?.effects, {
            hover: ['overlay'],
            touch: ['ripple'],
            focus: ['ring', 'overlay'],
            pressed: ['overlay'],
            selected: finalVariant === 'expressive' ? ['color'] : [],
        });

        const finalSelectedShape = selectedShape ?? config?.selectedShape ?? finalShape;
        const finalSelectedColor = selectedColor ?? config?.selectedColor ?? 'secondaryContainer';

        const markerControl =
            selection === 'none' ? null : marker === 'icon' ? (
                finalFluidMarker ? (
                    selected && CheckIcon
                ) : (
                    cloneElement(CheckIcon, { className: 'uui-item-check' })
                )
            ) : marker === 'switch' ? (
                <Switch aria-hidden="true" checked={selected} readOnly tabIndex={-1} />
            ) : marker === 'radio' || (marker === 'auto' && selection === 'single') ? (
                <Radio aria-hidden="true" checked={selected} readOnly tabIndex={-1} />
            ) : (
                <Checkbox aria-hidden="true" checked={selected} readOnly tabIndex={-1} />
            );

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
            if (finalDisabled) {
                return;
            }
            if (canSelect) {
                ctx.toggle(value);
            }
            if (children) {
                toggleOpen();
            }
            onClick?.(e);
            if (finalEffects.touch?.includes('ripple') && itemRef.current) {
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

        const expander = children
            ? cloneElement(expandIcon ?? KeyboardArrowDownIcon, { className: 'uui-item-expander' })
            : null;
        const trailingEnd =
            markerSlot === 'trailing' ? (
                <>
                    {expander}
                    {markerControl}
                </>
            ) : (
                expander
            );

        const finalContent = (
            <div className="uui-item-content">
                {content ?? (
                    <>
                        {overline && <div className="uui-item-overline">{overline}</div>}
                        {label && <div className="uui-item-label">{label}</div>}
                        {description && <div className="uui-item-description">{description}</div>}
                    </>
                )}
            </div>
        );

        const controlStyle = ControlStyle(style);
        if (finalEffects.selected?.includes('color') && selected) {
            controlStyle.bg(finalSelectedColor);
            controlStyle.text.on(finalSelectedColor);
            controlStyle.token('--uui-variant-color', getOnColorName(finalSelectedColor, true));
        }
        return (
            <>
                <div
                    {...props}
                    aria-controls={children ? groupId : undefined}
                    aria-disabled={finalDisabled || undefined}
                    aria-expanded={children ? expanded : undefined}
                    // eslint-disable-next-line eqeqeq
                    aria-label={ariaLabel ?? (content != null ? label : undefined)}
                    aria-selected={selected}
                    className={cn(
                        'uui-item',
                        getDensityClass(config?.density),
                        finalVariant === 'expressive' && 'uui-expressive',
                        getShapeClass(selected ? finalSelectedShape : finalShape),
                        finalEffects.focus?.includes('ring') && 'uui-focus-ring',
                        finalEffects.focus?.includes('overlay') && 'uui-focus-overlay',
                        finalEffects.hover?.includes('overlay') && 'uui-hover-overlay',
                        finalEffects.pressed?.includes('overlay') && 'uui-pressed-overlay',
                        media && `uui-media-${media}`,
                        selected && 'uui-selected',
                        finalDisabled && 'uui-disabled',
                        children && expanded && 'uui-open',
                        className
                    )}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    ref={mergeRefs(itemRef, ref)}
                    role={itemRole}
                    style={controlStyle.get()}
                    tabIndex={finalDisabled ? -1 : 0}>
                    <Leading content={leading} start={markerSlot === 'leading' ? markerControl : undefined} />
                    {finalContent}
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
