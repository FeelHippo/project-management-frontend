'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';
import { getProjects } from '@/hooks/projects';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  SortingState,
  Row,
} from '@tanstack/react-table';
import { columns } from '@/components/table/columns';
import React from 'react';
import { DataTableToolbar } from '@/components/table/toolbar';
import { DataTablePagination } from '@/components/table/pagination';
import { Project } from '@/lib/interfaces/project';
import useKeyboardMode from '@/hooks/useKeyboard';

export default function SidebarList() {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [currentlySelected, setCurrentlySelected] = React.useState<string>();

  // Recommended query creation
  // https://github.com/TanStack/query/discussions/846#discussioncomment-13454614
  const { data } = useQuery(
    queryOptions({
      queryKey: ['projects'],
      queryFn: getProjects,
      initialData: [] as Project[],
    }),
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const { rowRefs, setKeyboardEnabled, keyboardSelectionIdxRef } =
    useKeyboardMode(table.getRowModel());

  return (
    <div className="flex flex-col gap-4 h-full">
      <DataTableToolbar table={table} />
      <div className="overflow-scroll rounded-md border size-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  data-state={row.getIsSelected() && 'selected'}
                  className={currentlySelected == row.id ? 'bg-blue-100' : ''}
                  onClick={() => {
                    const keyboardRow = rowRefs.current.find((el) =>
                      el?.classList.contains('bg-blue-100'),
                    );
                    keyboardRow?.classList.remove('bg-blue-100');
                    setCurrentlySelected(row.id);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
