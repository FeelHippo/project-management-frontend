// https://tanstack.com/query/v5/docs/framework/react/guides/optimistic-updates#updating-a-list-of-todos-when-adding-a-new-todo
import { useMutation } from '@tanstack/react-query';
import {
  deleteProject,
  getProject,
  postProject,
  updateProject,
} from '@/hooks/projects';
import { Project } from '@/lib/interfaces/project';

export const mutationPost = () =>
  useMutation({
    mutationFn: postProject,
    onMutate: async (newProject, context) => {
      await context.client.cancelQueries({ queryKey: ['projects'] });
      const data = context.client.getQueryData(['projects']);
      context.client.setQueryData(['projects'], (old: Project[]) => [
        ...old,
        newProject,
      ]);
      return { data };
    },
    onError: (err, newTodo, onMutateResult, context) => {
      context.client.setQueryData(['projects'], onMutateResult?.data ?? []);
    },
    onSettled: (data, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({ queryKey: ['projects'] }),
  });
export const mutationDelete = () =>
  useMutation({
    mutationFn: (uids: string[]) => deleteProject(uids),
    onMutate: async (deletedUids, context) => {
      await context.client.cancelQueries({ queryKey: ['projects'] });
      const data = context.client.getQueryData(['projects']);
      context.client.setQueryData(['projects'], (old: Project[]) =>
        old.filter((project) => !deletedUids.includes(project.uid)),
      );
      return { data };
    },
    onError: (err, newTodo, onMutateResult, context) => {
      context.client.setQueryData(['projects'], onMutateResult?.data ?? []);
    },
    onSettled: (data, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({ queryKey: ['projects'] }),
  });
export const mutationDetails = () =>
  useMutation({
    mutationFn: (uid: string) => getProject(uid),
    onSettled: (data, error, variables, onMutateResult, context) =>
      context.client
        .invalidateQueries({ queryKey: ['project'] })
        .then(() => context.client.setQueryData(['project'], data)),
  });
export const mutationUpdate = () =>
  useMutation({
    mutationFn: ({
      uid,
      changes,
    }: {
      uid: string;
      changes: (
        | {
            property: string;
            value: string;
          }
        | {
            property: string;
            value: string[];
          }
      )[];
    }) => updateProject(uid, changes),
    onMutate: async (updatedProject, context) => {
      await context.client.cancelQueries({ queryKey: ['projects'] });
      // context.client.getQueryData(['projects']);
      context.client.setQueryData(['projects'], (old: Project[]) => {
        return old.map((oldProject) =>
          oldProject.uid == updatedProject.uid
            ? {
                ...oldProject,
                name:
                  updatedProject.changes?.find(
                    (change) => change.property == 'name',
                  )?.value ?? oldProject.name,
                description:
                  updatedProject.changes?.find(
                    (change) => change.property == 'description',
                  )?.value ?? oldProject.description,
                tags:
                  updatedProject.changes?.find(
                    (change) => change.property == 'tags',
                  )?.value ?? oldProject.tags,
              }
            : oldProject,
        );
      });
      const allProjects: Project[] | undefined = context.client.getQueryData([
        'projects',
      ]);
      // data should be all projects from BE
      // filter to find the updated one by updatedProject.uid, name it "data"
      const data = allProjects?.find(
        (project) => project.uid === updatedProject.uid,
      );
      return { data };
    },
    onError: (err, newTodo, onMutateResult, context) => {
      context.client.setQueryData(['projects'], onMutateResult?.data ?? []);
    },
    onSettled: (data, error, variables, onMutateResult, context) =>
      context.client
        .invalidateQueries({ queryKey: ['projects'] })
        .then((_) =>
          context.client.setQueryData(['project'], onMutateResult?.data),
        ),
  });
