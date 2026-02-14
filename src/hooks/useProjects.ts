import { useQuery } from '@tanstack/react-query';
import type { Project } from '../mocks/handlers';

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

async function fetchProject(id: string): Promise<Project> {
  const response = await fetch(`/api/projects/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }
  return response.json();
}

const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false,
};

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    ...defaultQueryOptions,
  });
}

export function useProject(id: string) {
  return useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => fetchProject(id),
    enabled: !!id,
    ...defaultQueryOptions,
  });
}
