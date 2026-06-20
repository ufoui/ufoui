import { HTMLAttributes } from 'react';
import { flexRender, Table } from '@tanstack/react-table';
import { cn } from '@ufoui/core';

import { ArrowDownwardIcon, ArrowUpwardIcon, UnfoldMoreIcon } from '../../assets/icons';

/**
 * Props for {@link DataTableHeader}.
 *
 * @category DataTable
 */
export interface DataTableHeaderProps<TData> extends HTMLAttributes<HTMLTableSectionElement> {
    /** TanStack Table instance obtained from `useReactTable()`. */
    table: Table<TData>;
}

/**
 * DataTableHeader — renders `<thead>` with column headers and sort indicators.
 *
 * @remarks
 * Clicking a sortable column header toggles ascending → descending → unsorted.
 * Enable sorting by passing `getSortingRowModel` to `useReactTable`.
 *
 * @category DataTable
 */
export const DataTableHeader = <TData,>({ table, className, ...props }: DataTableHeaderProps<TData>) => (
    <thead className={cn('uui-data-table-header', className)} {...props}>
        {table.getHeaderGroups().map(headerGroup => (
            <tr className="uui-data-table-header-row" key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th
                        className={cn(
                            'uui-data-table-head-cell',
                            header.column.getCanSort() && 'uui-data-table-head-cell--sortable'
                        )}
                        colSpan={header.colSpan}
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}>
                        {header.isPlaceholder ? null : (
                            <span className="uui-data-table-head-cell-inner">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {header.column.getCanSort() && (
                                    <span
                                        className={cn(
                                            'uui-data-table-sort-icon',
                                            header.column.getIsSorted() && 'uui-data-table-sort-icon--active'
                                        )}>
                                        {header.column.getIsSorted() === 'asc'
                                            ? ArrowUpwardIcon
                                            : header.column.getIsSorted() === 'desc'
                                              ? ArrowDownwardIcon
                                              : UnfoldMoreIcon}
                                    </span>
                                )}
                            </span>
                        )}
                    </th>
                ))}
            </tr>
        ))}
    </thead>
);
