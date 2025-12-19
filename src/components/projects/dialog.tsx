import { Button } from '@/components/ui/button';
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
import { Tag } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tags } from '@/lib/interfaces/project';
import { Spinner } from '@/components/ui/spinner';
import React, { JSX } from 'react';
import { projectFormSchema } from '@/lib/validation/form';

export function ProjectDialog<Data>({
  onSubmit,
  open,
  setOpen,
  title,
  description,
  isPending,
  triggerIcon,
  defaultName,
  defaultDescription,
  defaultTags,
}: {
  onSubmit: ({ value }: { value: any }) => Promise<void>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  isPending: boolean;
  triggerIcon: JSX.Element;
  defaultName?: string;
  defaultDescription?: string;
  defaultTags?: string[];
}) {
  const form = useForm({
    defaultValues: {
      name: defaultName ?? '',
      description: defaultDescription ?? '',
      tags: defaultTags ?? ([] as unknown[]),
    },
    validators: {
      onSubmit: projectFormSchema,
    },
    onSubmit,
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">{triggerIcon}</Button>
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
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
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
                  className="flex-wrap"
                >
                  {Object.values(Tags).map((tag: string, index) => (
                    <form.Field
                      key={index}
                      name="tags"
                      children={(field) => {
                        return (
                          <Field className="w-fit">
                            <ToggleGroupItem
                              value={tag}
                              aria-label="Toggle star"
                              onClick={() =>
                                field.state.value.includes(tag)
                                  ? field.removeValue(index)
                                  : field.pushValue(tag)
                              }
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
              {isPending ? <Spinner /> : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
