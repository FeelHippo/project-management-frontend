'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/hooks/projects';
import { DataTableColumnHeader } from '@/components/table/columnHeader';
import { statuses } from '@/components/table/data/status';
import { ChevronRight } from 'lucide-react';

export const columns: ColumnDef<Project>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
      filterFn: (row, columnId, filterValue) => {
          return `${row.original.name} ${row.original.description}`.includes(filterValue);
      },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="translate-x-[4px]" title="Name and Description" />
    ),
    cell: ({ row }) => {
      const label = row.original.name;

      return (
        <div className="flex gap-2">
          {label && <Badge variant="outline">{label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.description}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status'),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center gap-2">
          {status.icon && (
            <status.icon className="text-muted-foreground size-4" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const uid = row.original.uid;

      return (
        <div className="flex gap-2">
          <ChevronRight onClick={() => console.log('NAVIGATE TO DETAILS')} />
        </div>
      );
    },
  },
];
