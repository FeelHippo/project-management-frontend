'use client';

import Session from 'supertokens-web-js/recipe/session';
import React, { useEffect } from 'react';
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { TimelineLayout } from '@/components/ui/timeline-layout';
import { getProject, getProjects } from '@/hooks/projects';
import { CalendarIcon, Edit, Tag } from 'lucide-react';
import { TimelineElement } from '@/lib/interfaces/timeline';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ProjectDialog } from '@/components/projects/dialog';
import { mutationDetails, mutationUpdate } from '@/mutations/projects';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { statuses } from '@/components/table/data/status';
import { AppSidebar } from '@/components/sidebar/appSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Dashboard() {
  const updateProject = mutationUpdate();
  const [open, setOpen] = React.useState(false);

  // TODO(Filippo): avoid flash navigation to dashboard if user has no session
  // protect this route from direct navigation. Warning: might be causing https://github.com/vercel/next.js/issues/78396
  useEffect(() => {
    (async () => {
      if (!(await Session.doesSessionExist())) {
        window.location.href = '/login';
      }
    })();
  }, []);

  const queryClient = useQueryClient();

  useQuery(
    queryOptions({
      queryKey: ['projects'],
      queryFn: getProjects,
      select: (data) =>
        data.length && queryClient.setQueryData(['projectUid'], data[0].uid),
    }),
  );

  const projectUid = queryClient.getQueryData(['projectUid']);

  const { data } = useQuery({
    queryKey: ['project'],
    queryFn: () => getProject(projectUid as string),
    enabled: !!projectUid,
  });

  if (!data) return <AppSidebar />;

  const { createdAt, updatedAt, archivedAt, description, status, name, tags } =
    data!;
  const timelineData = [
    {
      name: 'Created',
      value: createdAt,
      description: description,
      color: 'primary',
      size: 'lg',
    },
    {
      name: 'Updated',
      value: updatedAt,
      description: status,
      color: 'secondary',
      size: 'lg',
    },
    {
      name: 'Archived',
      value: archivedAt,
      description: 'Project no longer active',
      color: 'destructive',
      size: 'lg',
    },
  ]
    .filter(({ value }) => !!value)
    .map(
      ({ name, value, description }, index) =>
        ({
          id: index,
          date: value!.slice(0, 10),
          title: name,
          description,
        }) as TimelineElement,
    );

  const callback = async (
    name: string,
    description: string,
    tags: string[],
  ) => {
    const nameChange = name != data.name && {
      property: 'name',
      value: name,
    };
    const descriptionChange = description != data.description && {
      property: 'description',
      value: description,
    };
    const tagsChange = (tags.some((tag) => !data.tags.includes(tag)) ||
      data.tags.some((tag) => !tags.includes(tag))) && {
      property: 'tags',
      value: tags,
    };
    return updateProject.mutate({
      uid: data.uid,
      changes: [nameChange, descriptionChange, tagsChange].filter(
        (change) => !!change,
      ),
    });
  };

  return (
    <div className="flex flex-row h-vh w-full justify-between">
      <AppSidebar />
      <SidebarTrigger />
      <Card key={data.status} className="h-fit w-2/3 m-8">
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>
            Here you can see the most recent events:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TimelineLayout
            items={timelineData}
            size="lg"
            iconColor="primary"
            customIcon={<CalendarIcon />}
          />
        </CardContent>
      </Card>
      <Card className="h-100 w-1/3 m-8">
        <CardHeader>
          <div className="flex flex-row w-full items-start justify-between">
            <CardTitle>{name}</CardTitle>
            <ProjectDialog
              key={data.uid}
              callback={callback}
              open={open}
              setOpen={setOpen}
              title="Modify Project"
              description="The below details can be modified:"
              isPending={updateProject.isPending}
              triggerIcon={<Edit />}
              defaultName={name}
              defaultDescription={description}
              defaultTags={tags}
            />
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col w-full h-full items-start justify-between">
          <ToggleGroup
            type="multiple"
            variant="outline"
            spacing={2}
            size="sm"
            className="flex-wrap"
          >
            {tags.map((tag: string, index) => (
              <Field key={index} className="w-fit">
                <ToggleGroupItem
                  value={tag}
                  aria-label="Toggle star"
                  className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
                >
                  <Tag />
                  {tag}
                </ToggleGroupItem>
              </Field>
            ))}
          </ToggleGroup>
          <div className="flex flex-row w-full h-full items-end justify-end">
            <Select
              onValueChange={(value) => {
                updateProject.mutate({
                  uid: data.uid,
                  changes: [{ property: 'status', value: value }],
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={
                    statuses.find(({ value }) => status === value)!.label
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statuses.map(({ value, label, icon }, index) => (
                    <SelectItem key={index} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
