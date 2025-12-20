import { Badge, BadgeCheck, BadgePercent, Ban, OctagonX } from 'lucide-react';

export const statuses = [
  {
    value: 'NEW',
    label: 'New',
    icon: Badge,
  },
  {
    value: 'IN_PROGRESS',
    label: 'In Progress',
    icon: BadgePercent,
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
    icon: BadgeCheck,
  },
  {
    value: 'ARCHIVED',
    label: 'Archived',
    icon: Ban,
  },
  {
    value: 'TERMINATED',
    label: 'Terminated',
    icon: OctagonX,
  },
];
