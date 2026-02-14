import { http, HttpResponse, delay } from 'msw';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'planning' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-03-15',
  },
  {
    id: '2',
    name: 'Mobile App MVP',
    description: 'Build minimum viable product for iOS and Android',
    status: 'planning',
    priority: 'high',
    dueDate: '2026-04-01',
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integrate third-party payment gateway APIs',
    status: 'completed',
    priority: 'medium',
    dueDate: '2026-02-28',
  },
  {
    id: '4',
    name: 'User Authentication',
    description: 'Implement OAuth2 and JWT authentication system',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-03-10',
  },
  {
    id: '5',
    name: 'Performance Audit',
    description: 'Analyze and optimize application performance',
    status: 'pending',
    priority: 'low',
    dueDate: '2026-05-01',
  },
];

export const handlers = [
  http.get('/api/projects', async () => {
    await delay(200);
    return HttpResponse.json(mockProjects);
  }),
  http.get('/api/projects/:id', async ({ params }) => {
    await delay(200);
    const project = mockProjects.find((p) => p.id === params.id);
    if (!project) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(project);
  }),
];
