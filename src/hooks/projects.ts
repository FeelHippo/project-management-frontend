import { Project } from '@/lib/interfaces/project';

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
    {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
      },
    },
  );
  const data = await response.json();
  if (!data?.projects) {
    return [];
  }
  return data.projects;
};

export const getProject = async (uid: string): Promise<Project | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${uid}`,
    {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
      },
    },
  );
  const data = await response.json();
  if (!data?.project) {
    return null;
  }
  return data.project;
};

export const postProject = async (project: Partial<Project>): Promise<void> => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
    },
    body: JSON.stringify(project),
  });
};

export const updateProject = async (
  changes: { property: string; value: string }[],
): Promise<void> => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
    },
    body: JSON.stringify({ changes }),
  });
};

export const deleteProject = async (uids: string[]): Promise<void> => {
  for (const uid of uids) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${uid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
      },
    });
  }
};
