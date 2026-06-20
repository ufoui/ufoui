import { HTMLAttributes } from 'react';
import { flexRender, Row, Table } from '@tanstack/react-table';

import { cn } from '@ufoui/core';

/**
 * Props for {@link DataTableBody}.
 *
 * @category DataTable
 */
export interface DataTableBodyProps<TData> extends HTMLAttributes<HTMLTableSectionElement> {
    /** TanStack Table instance obtained from `useReactTable()`. */
    table: Table<TData>;

    /** Called when the user clicks a row. */
    onRowClick?: (row: Row<TData>) => void;
}

/**
 * DataTableBody — renders `<tbody>` with data rows from a TanStack Table instance.
 *
 * @remarks
 * Rows marked as selected (via TanStack row selection) receive the
 * `uui-data-table-row--selected` class and corresponding MD3 color tokens.
 *
 * @category DataTable
 */
export const DataTableBody = <TData,>({
    table,
    onRowClick,
    className,
    ...props
}: DataTableBodyProps<TData>) => (
    <tbody className={cn('uui-data-table-body', className)} {...props}>
        {table.getRowModel().rows.map(row => (
            <tr
                key={row.id}
                className={cn(
                    'uui-data-table-row',
                    onRowClick && 'uui-data-table-row--clickable',
                    row.getIsSelected() && 'uui-data-table-row--selected',
                )}
                onClick={() => onRowClick?.(row)}
            >
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="uui-data-table-cell">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
);
