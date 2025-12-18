'use client';

import { type Table } from '@tanstack/react-table';
import { Plus, Tag, X } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';
import { projectFormSchema } from '@/lib/validation/form';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { postProject, Project } from '@/hooks/projects';
import { Spinner } from '@/components/ui/spinner';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface DataTableToolbarProps<Data> {
  table: Table<Data>;
}

export function DataTableToolbar<Data>({ table }: DataTableToolbarProps<Data>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const mutation = useMutation({
    mutationFn: postProject,
  });

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      tags: [] as unknown[],
    },
    validators: {
      onSubmit: projectFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { name, description, tags } = value as {
          name: string;
          description: string;
          tags: string[];
        };
        mutation.mutate({ name, description, tags });
        toast.message('New Project created.');
      } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
          toast.error(err.message);
        } else {
          toast.error('Oops! Something went wrong.');
        }
      }
    },
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
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
        <DataTableViewOptions table={table} />
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <form
              id="project-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit().then();
              }}
            >
              <DialogHeader className="h-16">
                <DialogTitle>New Project</DialogTitle>
                <DialogDescription>
                  Please provide the following project details:
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 my-8">
                <div className="grid gap-4">
                  <Label htmlFor="name">Name</Label>
                  <form.Field
                    name="name"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <Input
                            id="name"
                            name="name"
                            value={field.state.value as string}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            autoComplete="off"
                            aria-invalid={isInvalid}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  ></form.Field>
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="description">Description</Label>
                  <form.Field
                    name="description"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <Input
                            id="description"
                            name="description"
                            value={field.state.value as string}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            autoComplete="off"
                            aria-invalid={isInvalid}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  ></form.Field>
                </div>
                <div className="grid gap-4">
                  <FieldGroup>
                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      spacing={2}
                      size="sm"
                    >
                      {['dog', 'cat', 'horse'].map((tag: string, index) => (
                        <form.Field
                            key={index}
                          name="tags"
                          children={(field) => {
                            return (
                              <Field>
                                <ToggleGroupItem
                                  value={tag}
                                  aria-label="Toggle star"
                                  onClick={() => field.state.value.includes(tag) ? field.removeValue(index) : field.pushValue(tag)}
                                  className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
                                >
                                  <Tag />
                                    {tag}
                                </ToggleGroupItem>
                              </Field>
                            );
                          }}
                        ></form.Field>
                      ))}
                    </ToggleGroup>
                  </FieldGroup>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" form="project-form">
                  {mutation.isPending ? <Spinner /> : 'Save changes'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
