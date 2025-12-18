export type Project = {
  uid: string;
  name: string;
  description: string;
  tags: string[];
  status: string;
  createdAt: string;
  updatedAt: string | null;
  wasUpdated: boolean;
  archivedAt: string | null;
  wasArchived: boolean;
  isStoredOnDB: boolean;
};

export enum Tags {
  tech = 'Tech',
  estate = 'Estate',
  pharma = 'Pharma',
  medical = 'Medical',
  finance = 'Finance',
  leisure = 'Leisure',
}
