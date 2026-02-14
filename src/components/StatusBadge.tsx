import { memo } from 'react';

const statusClasses: Record<string, string> = {
  completed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  planning: 'bg-yellow-100 text-yellow-800',
  pending: 'bg-gray-100 text-gray-800',
};

type ProjectStatus = 'pending' | 'planning' | 'in-progress' | 'completed';

interface StatusBadgeProps {
  status: ProjectStatus;
}

export const StatusBadge = memo(function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status]}`}>
      {status}
    </span>
  );
});
