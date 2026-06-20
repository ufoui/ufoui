import { HTMLAttributes } from 'react';
import { Table } from '@tanstack/react-table';

import { cn, getWrapperStyle, IconButton, Label, WrapperProps } from '@ufoui/core';

import { ChevronLeftIcon, ChevronRightIcon } from '../../assets/icons';

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/**
 * Props for {@link DataTablePagination}.
 *
 * @category DataTable
 */
export interface DataTablePaginationProps<TData = unknown>
    extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
        WrapperProps {
    /** TanStack Table instance obtained from `useReactTable()`. */
    table: Table<TData>;

    /** Page size options shown in the rows-per-page selector. Default: `[10, 25, 50, 100]`. */
    pageSizeOptions?: number[];
}

/**
 * DataTablePagination — previous/next navigation and rows-per-page selector.
 *
 * @remarks
 * Requires `getPaginationRowModel` passed to `useReactTable`.
 * Place alongside {@link DataTable}, typically directly below it.
 *
 * @example
 * ```tsx
 * <DataTablePagination table={table} pageSizeOptions={[5, 10, 20]} />
 * ```
 *
 * @category DataTable
 */
export const DataTablePagination = <TData = unknown,>({
    table,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    className,
    style,
    ...other
}: DataTablePaginationProps<TData>) => {
    const { wrapperStyle, otherProps } = getWrapperStyle(other);
    const { pageIndex, pageSize } = table.getState().pagination;
    const totalRows = table.getFilteredRowModel().rows.length;
    const from = pageIndex * pageSize + 1;
    const to = Math.min((pageIndex + 1) * pageSize, totalRows);

    return (
        <div
            className={cn('uui-data-table-pagination', className)}
            style={{ ...wrapperStyle, ...style }}
            {...otherProps}
        >
            <Label className="uui-data-table-pagination-info" color="onSurfaceVariant" font="bodySmall">
                {from}–{to} z {totalRows}
            </Label>

            <span className="uui-data-table-pagination-size">
                <Label color="onSurfaceVariant" font="bodySmall">Wierszy:</Label>
                <select
                    value={pageSize}
                    onChange={e => table.setPageSize(Number(e.target.value))}
                >
                    {pageSizeOptions.map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </span>

            <IconButton
                disabled={!table.getCanPreviousPage()}
                icon={ChevronLeftIcon}
                size="small"
                onClick={() => { table.previousPage(); }}
            />

            <IconButton
                disabled={!table.getCanNextPage()}
                icon={ChevronRightIcon}
                size="small"
                onClick={() => { table.nextPage(); }}
            />
        </div>
    );
};
