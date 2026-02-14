import { http, HttpResponse, delay } from 'msw';
import type { Project } from '../handlers';

export const createNodeHandlers = (projects: Project[]) => [
  http.get('/api/projects', async () => {
    await delay(100);
    return HttpResponse.json(projects);
  }),
  http.get('/api/projects/:id', async ({ params }) => {
    await delay(100);
    const project = projects.find((p) => p.id === params.id);
    if (!project) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(project);
  }),
];
