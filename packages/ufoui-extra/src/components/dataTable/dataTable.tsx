import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import {
    BorderColor,
    cn,
    ControlStyle,
    ElementBorder,
    ElementElevation,
    ElementShape,
    getBorderClass,
    getElevationClass,
    getShapeClass,
    getWrapperStyle,
    WrapperProps,
} from '@ufoui/core';

/**
 * Props for {@link DataTable}.
 *
 * @category DataTable
 */
export interface DataTableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, WrapperProps {
    /** React children — use {@link DataTableHeader} and {@link DataTableBody}. */
    children?: ReactNode;

    /** Border width (0–5). */
    border?: ElementBorder;

    /** Border color token. */
    borderColor?: BorderColor;

    /** Elevation level (0–5). */
    elevation?: ElementElevation;

    /** Shape/border-radius token. */
    shape?: ElementShape;

    /** Pins the header row when the content overflows vertically. */
    stickyHeader?: boolean;

    /** Expands the table to fill the available width. */
    fullWidth?: boolean;

    /** Minimum table width in px before horizontal scroll activates. Prevents columns from being squished on narrow viewports. */
    minWidth?: number;
}

/**
 * DataTable — scrollable container wrapping a `<table>` element.
 *
 * @remarks
 * Compose with {@link DataTableHeader} and {@link DataTableBody} as children,
 * and place {@link DataTablePagination} alongside.
 *
 * @example
 * ```tsx
 * <DataTable elevation={1} shape="rounded" fullWidth>
 *   <DataTableHeader table={table} />
 *   <DataTableBody table={table} onRowClick={row => console.log(row.original)} />
 * </DataTable>
 * <DataTablePagination table={table} />
 * ```
 *
 * @category DataTable
 * @function
 * @param props - Layout and visual styling props.
 */
export const DataTable = forwardRef<HTMLDivElement, DataTableProps>((props, ref) => {
    const {
        children,
        border,
        borderColor,
        elevation,
        shape,
        stickyHeader,
        fullWidth,
        minWidth,
        className,
        style,
        ...other
    } = props;

    const { wrapperStyle, otherProps } = getWrapperStyle(other);
    const cs = ControlStyle(wrapperStyle);
    cs.merge(style);
    if (borderColor) cs.border(borderColor);

    return (
        <div
            ref={ref}
            className={cn(
                'uui-data-table-root',
                elevation !== undefined && getElevationClass(elevation),
                shape && getShapeClass(shape),
                border !== undefined && getBorderClass(border),
                stickyHeader && 'uui-data-table--sticky-header',
                fullWidth && 'uui-data-table--full-width',
                className,
            )}
            style={cs.get()}
            {...otherProps}
        >
            <table className="uui-data-table" style={minWidth ? { minWidth } : undefined}>
                {children}
            </table>
        </div>
    );
});

DataTable.displayName = 'DataTable';
