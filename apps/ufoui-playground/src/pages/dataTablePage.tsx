import { useState } from 'react';
import { faker } from '@faker-js/faker';
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';

import {
    Article,
    Aside,
    BorderColor,
    Checkbox,
    Chip,
    ElementBorder,
    ElementElevation,
    ElementShape,
    Grid,
    H2,
    P,
    Section,
} from '@ufoui/core';
import { DataTable, DataTableBody, DataTableHeader, DataTablePagination } from '@ufoui/extra';

import { Modifiers } from '../components/modifiers/modifiers';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'pending';
    joined: string;
}

const STATUSES = ['active', 'inactive', 'pending'] as const;
const ROLES = ['Admin', 'Editor', 'Viewer', 'Manager'];

const data: User[] = Array.from({ length: 87 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(ROLES),
    status: faker.helpers.arrayElement(STATUSES),
    joined: faker.date.past({ years: 3 }).toLocaleDateString('pl-PL'),
}));

const statusColor: Record<User['status'], 'success' | 'error' | 'warning'> = {
    active: 'success',
    inactive: 'error',
    pending: 'warning',
};

const columns: ColumnDef<User>[] = [
    { accessorKey: 'name', header: 'Imię i nazwisko' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', enableSorting: false, header: 'Rola' },
    {
        accessorKey: 'status',
        cell: ({ getValue }) => {
            const s = getValue<User['status']>();
            return <Chip chipType="suggestion" color={statusColor[s]} label={s} size="extraSmall" />;
        },
        header: 'Status',
    },
    { accessorKey: 'joined', enableSorting: false, header: 'Dołączył/a' },
];

export const DataTablePage = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [selected, setSelected] = useState<string | null>(null);

    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [stickyHeader, setStickyHeader] = useState(false);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: { pagination: { pageSize: 10 } },
        onSortingChange: setSorting,
        state: { sorting },
    });

    return (
        <Article direction="row" fullWidth>
            <Section className="gap-4 p-4" grow>
                <H2>DataTable — @ufoui/extra</H2>

                {selected && (
                    <P color="onSurfaceVariant" font="bodySmall">
                        Kliknięto: {selected}
                    </P>
                )}

                <DataTable
                    border={border ?? undefined}
                    borderColor={borderColor ?? undefined}
                    elevation={elevation ?? undefined}
                    fullWidth
                    minWidth={640}
                    shape={shape ?? undefined}
                    stickyHeader={stickyHeader}
                >
                    <DataTableHeader table={table} />
                    <DataTableBody
                        onRowClick={row => {
                            setSelected(row.original.name);
                        }}
                        table={table}
                    />
                </DataTable>

                <DataTablePagination pageSizeOptions={[10, 25, 50]} table={table} />
            </Section>

            <Aside width={240}>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    elevation={elevation}
                    onChange={({ elevation: el, shape: sp, border: bd, borderColor: bc }) => {
                        setElevation(el ?? null);
                        setShape(sp ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                    }}
                    shape={shape}
                />
                <Grid alignItems="center" cols={2} gapX={16} gapY={4}>
                    <>
                        <span>Sticky header:</span>
                        <Checkbox
                            checked={stickyHeader}
                            density="dense"
                            label=" "
                            onChange={() => setStickyHeader(v => !v)}
                        />
                    </>
                </Grid>
            </Aside>
        </Article>
    );
};
