import { Project } from '@/lib/interfaces/project';

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
    {
      headers: {
        'x-api-key': 'sXQ8vYFpo6RjtAopYshisaToSzxRnEB5',
      },
    },
  );
  const data = await response.json();
  if (!data?.projects) {
    return [];
  }
  return data.projects;
};

export const postProject = async (project: Partial<Project>): Promise<void> => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'sXQ8vYFpo6RjtAopYshisaToSzxRnEB5',
    },
    body: JSON.stringify(project),
  });
};

export const deleteProject = async (uids: string[]): Promise<void> => {
  for (const uid of uids) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${uid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'sXQ8vYFpo6RjtAopYshisaToSzxRnEB5',
      },
    });
  }
};
