import React, {
    forwardRef,
    ForwardRefExoticComponent,
    RefAttributes,
    useContext,
    useEffect,
    useRef,
} from 'react';

import { SelectionContext } from '../../context/selectionContext';
import { Leading, Trailing } from '../../internal/slots/slot';
import { cn, createRipple, ElementDensity, getDensityClass, mergeRefs } from '../../utils';
import { IS_ITEM } from './item.guards';

interface ItemCtxConfig {
    itemRole?: string;
    density?: ElementDensity;
}

/**
 * Props for the {@link Item} component.
 *
 * @category Item
 */
export interface ItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Secondary supporting text. */
    description?: string;

    /** Disables interactions and focus. */
    disabled?: boolean;

    /** Leading slot content. */
    leading?: React.ReactNode;

    /** Primary label text. */
    label?: string;

    /** Trailing slot content. */
    trailing?: React.ReactNode;

    /** Value identifier used for selection. */
    value?: string;
}

/**
 * **Item** — dumb renderer for list, listbox and menu contexts.
 *
 * Reads ARIA role and density from {@link SelectionContext}. Registers
 * itself with the roving focus controller provided by the parent `List`.
 *
 * @remarks
 * Export aliases: `ListItem`, `Option`.
 *
 * @example
 * ```tsx
 * <List variant="listbox" type="single">
 *   <Item value="a" label="Apple" />
 *   <Item value="b" label="Banana" description="Yellow fruit" />
 * </List>
 * ```
 *
 * @function
 * @category Item
 */
export const Item = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, description, leading, trailing, value, disabled, className, onClick, onKeyDown, ...props }, ref) => {
        const ctx = useContext(SelectionContext);
        const config = ctx?.config as ItemCtxConfig | undefined;
        const itemRef = useRef<HTMLDivElement>(null);

        const selected = value ? (ctx?.values.includes(value) ?? false) : false;
        const itemRole = config?.itemRole ?? 'listitem';

        useEffect(() => {
            const el = itemRef.current;
            if (!el || !ctx?.roving) return;
            ctx.roving.register(el);
            return () => ctx.roving?.unregister(el);
        }, [ctx?.roving]);

        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (disabled) return;
            if (value && ctx) ctx.toggle(value);
            onClick?.(e);
            if (itemRef.current) createRipple(itemRef.current, e);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            ctx?.roving?.onKeyDown(e);
            if ((e.key === 'Enter' || e.key === ' ') && !disabled && value && ctx) {
                e.preventDefault();
                ctx.toggle(value);
            }
            onKeyDown?.(e);
        };

        return (
            <div
                {...props}
                ref={mergeRefs(itemRef, ref)}
                role={itemRole}
                aria-selected={selected}
                aria-disabled={disabled || undefined}
                tabIndex={disabled ? -1 : 0}
                className={cn(
                    'uui-item',
                    getDensityClass(config?.density),
                    selected && 'uui-selected',
                    disabled && 'uui-disabled',
                    className,
                )}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
            >
                <Leading content={leading} />
                <div className="uui-item-text">
                    {label && <div className="uui-item-label">{label}</div>}
                    {description && <div className="uui-item-description">{description}</div>}
                </div>
                <Trailing content={trailing} />
            </div>
        );
    }
);

type ItemComponent = ForwardRefExoticComponent<ItemProps & RefAttributes<HTMLDivElement>> & {
    [IS_ITEM]?: true;
};

(Item as ItemComponent)[IS_ITEM] = true;
Item.displayName = 'Item';

/** @category Item */
export const Option = Item;
