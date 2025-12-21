import { Project } from '@/lib/interfaces/project';
import fetch from 'node-fetch';
import https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
    {
      agent: httpsAgent,
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
      agent: httpsAgent,
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
    agent: httpsAgent,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
    },
    body: JSON.stringify(project),
  });
};

export const updateProject = async (
  uid: string,
  changes: (
    | {
        property: string;
        value: string;
      }
    | {
        property: string;
        value: string[];
      }
  )[],
): Promise<void> => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${uid}`, {
    method: 'PATCH',
    agent: httpsAgent,
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
      agent: httpsAgent,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
      },
    });
  }
};
