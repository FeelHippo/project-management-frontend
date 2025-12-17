import {
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
} from 'lucide-react';

export const statuses = [
  {
    value: 'NEW',
    label: 'New',
    icon: HelpCircle,
  },
  {
    value: 'IN_PROGRESS',
    label: 'In Progress',
    icon: Timer,
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
    icon: Circle,
  },
  {
    value: 'ARCHIVED',
    label: 'Archived',
    icon: CheckCircle,
  },
  {
    value: 'TERMINATED',
    label: 'Terminated',
    icon: CircleOff,
  },
];
