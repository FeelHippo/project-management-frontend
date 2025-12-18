'use client';

import Session from 'supertokens-web-js/recipe/session';
import React, { useEffect } from 'react';
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { TimelineLayout } from '@/components/ui/timeline-layout';
import { getProject } from '@/hooks/projects';
import { ViewTransition } from 'react';
import { CalendarIcon, Tag } from 'lucide-react';
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

export default function Dashboard() {
  // TODO(Filippo): avoid flash navigation to dashboard if user has no session
  // protect this route frm direct navigation
  useEffect(() => {
    (async () => {
      if (!(await Session.doesSessionExist())) {
        window.location.href = '/login';
      }
    })();
  }, []);

  const queryClient = useQueryClient();
  const projectUid = queryClient.getQueryData(['detailUid']);

  if (!projectUid) return null;

  const { data } = useQuery(
    queryOptions({
      queryKey: ['project'],
      queryFn: () => getProject(projectUid as string),
    }),
  );

  if (!data) return null;

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

  return (
    <div className="flex flex-row h-dvh w-full gap-12 px-12 py-3">
      <ViewTransition>
        <Card className="h-fit w-2/3">
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
      </ViewTransition>
      <ViewTransition>
        <Card className="h-60 w-1/3">
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </ViewTransition>
    </div>
  );
}
