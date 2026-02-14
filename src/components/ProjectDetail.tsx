import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';
import { StatusBadge } from './StatusBadge';
import { ErrorMessage } from './ErrorMessage';
import { BackLink } from './BackLink';
import { PageContainer } from './PageContainer';

const DetailSkeleton = memo(function DetailSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
});

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProject(id ?? '');

  if (isLoading) {
    return (
      <PageContainer maxWidth="2xl">
        <BackLink />
        <div role="status" aria-live="polite" aria-label="Loading project details">
          <DetailSkeleton />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer maxWidth="2xl">
        <BackLink />
        <ErrorMessage message={error.message} title="Error loading project" />
      </PageContainer>
    );
  }

  if (!project) {
    return (
      <PageContainer maxWidth="2xl">
        <BackLink />
        <p className="text-gray-600">Project not found</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="2xl">
      <BackLink />

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <StatusBadge status={project.status} />
        </div>

        <p className="text-gray-700 mb-6">{project.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Priority</p>
            <p className="font-medium capitalize">{project.priority}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">{project.dueDate}</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
