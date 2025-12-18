// https://tanstack.com/query/v5/docs/framework/react/guides/optimistic-updates#updating-a-list-of-todos-when-adding-a-new-todo
import { useMutation } from '@tanstack/react-query';
import { deleteProject, getProject, postProject } from '@/hooks/projects';
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
