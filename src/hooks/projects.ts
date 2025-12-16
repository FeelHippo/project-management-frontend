type Project = {
    uid: string;
    name: string;
    description: string;
    tags: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
    wasUpdated: boolean;
    archivedAt: string;
    wasArchived: boolean;
    isStoredOnDB: boolean;
}

export const getProjects = async (): Promise<Project[]> => {
    const response = await fetch('http://project-management-backend-env.eba-srcjwhmq.eu-west-1.elasticbeanstalk.com/api/projects', {
        headers: {
            'x-api-key': 'sXQ8vYFpo6RjtAopYshisaToSzxRnEB5',
        }
    });
    const data = await response.json();
    if (!data?.projects) {
        return [];
    }
    return data.projects;
}