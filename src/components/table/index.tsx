'use client';

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: (value) => value.getValue(),
  }),
];

export const TableComponent = () => {
  const [clientReady, setClientReady] = useState(false);
  const [data] = useState<Person[]>(() => [
    { id: 1, firstName: 'Vino', lastName: 'Faeyza' },
    { id: 2, firstName: 'Salman', lastName: 'Al Farisy' },
  ]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    state: { sorting },
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  useEffect(() => setClientReady(true), []);

  if (!clientReady) {
    return null;
  }

  console.log(table.getAllColumns());

  return (
    <div className="p-2">
      <div>
        {table.getAllColumns().map((column) => {
          return (
            <input
              key={column.id}
              {...{
                type: 'checkbox',
                checked: column.getIsVisible(),
                onChange: column.getToggleVisibilityHandler(),
              }}
            />
          );
        })}
      </div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      colSpan={header.colSpan}
                      key={header.id}
                      className={header.column.getCanSort() ? 'cursor-pointer bg-red-200' : ''}
                      onClick={() => header.column.toggleSorting()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="h-4" />
      {/* <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button> */}
    </div>
  );
};
