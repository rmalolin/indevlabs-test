import { useState, useTransition, memo } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import type { Project } from '../mocks/handlers';
import { StatusBadge } from './StatusBadge';
import { ErrorMessage } from './ErrorMessage';
import { PageContainer } from './PageContainer';

const ProjectCardSkeleton = memo(function ProjectCardSkeleton() {
  return (
    <div className="block p-4 bg-white border border-gray-200 rounded-lg animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-72 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
      </div>
      <div className="mt-3 flex gap-4">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
});

const LoadingState = memo(function LoadingState() {
  return (
    <div className="space-y-4" role="status" aria-live="polite" aria-label="Loading projects">
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </div>
  );
});

const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  return (
    <li>
      <Link
        to={`/project/${project.id}`}
        className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-gray-600 mt-1">{project.description}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>
        <div className="mt-3 flex gap-4 text-sm text-gray-500">
          <span>Priority: {project.priority}</span>
          <span>Due: {project.dueDate}</span>
        </div>
      </Link>
    </li>
  );
});

export function ProjectList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  const { data: projects, isLoading, error } = useProjects();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    startTransition(() => {
      setSearchTerm(value);
    });
  };

  const filteredProjects: Project[] | undefined = projects?.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">Projects</h1>
        <div className="mb-6">
          <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <LoadingState />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">Projects</h1>
        <ErrorMessage message={error.message} title="Error loading projects" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search projects"
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity ${isPending ? 'opacity-70' : ''}`}
        />
      </div>

      <ul className="space-y-4">
        {filteredProjects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>

      {filteredProjects?.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No projects found</p>
      ) : null}
    </PageContainer>
  );
}
