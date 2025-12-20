'use client';

import { type Table } from '@tanstack/react-table';
import { Plus, X, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from '@/components/table/filter';
import { statuses } from '@/components/table/data/status';
import { Button } from '@/components/ui/button';
import { DataTableViewOptions } from '@/components/table/options';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { Project } from '@/lib/interfaces/project';
import React from 'react';
import { mutationPost, mutationDelete } from '@/mutations/projects';
import { ProjectDialog } from '@/components/projects/dialog';

interface DataTableToolbarProps<Data> {
  table: Table<Data>;
}

export function DataTableToolbar<Data>({ table }: DataTableToolbarProps<Data>) {
  const postProject = mutationPost();
  const deleteProject = mutationDelete();

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const isFiltered = table.getState().columnFilters.length > 0;

  const callback = async (name: string, description: string, tags: string[]) =>
    postProject.mutate({ name, description, tags });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          id="formSearch"
          placeholder="Filter projects..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[200px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {table.getIsSomeRowsSelected() && (
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="h-16">
                <DialogTitle>Delete Project(s)</DialogTitle>
                <DialogDescription>
                  WARNING: this action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={() => {
                    deleteProject.mutate(
                      table.getSelectedRowModel().rows.map((row) => {
                        const rowData = row.original as Project;
                        return rowData.uid;
                      }),
                    );
                    table.toggleAllRowsSelected(false);
                    setOpenDelete(false);
                  }}
                >
                  {deleteProject.isPending ? <Spinner /> : 'Confirm'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        <DataTableViewOptions table={table} />
        <ProjectDialog
          callback={callback}
          open={open}
          setOpen={setOpen}
          title="New Project"
          description="Please provide the following project details:"
          isPending={postProject.isPending}
          triggerIcon={<Plus />}
        />
      </div>
    </div>
  );
}
