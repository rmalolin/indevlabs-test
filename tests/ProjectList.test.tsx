import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { http, HttpResponse, delay } from 'msw';
import { ProjectList } from '../src/components/ProjectList';
import type { Project } from '../src/mocks/handlers';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-03-15',
  },
  {
    id: '2',
    name: 'Mobile App MVP',
    description: 'Build minimum viable product',
    status: 'planning',
    priority: 'high',
    dueDate: '2026-04-01',
  },
];

const server = setupServer(
  http.get('/api/projects', async () => {
    await delay(10);
    return HttpResponse.json(mockProjects);
  })
);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('ProjectList', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('renders loading state initially', async () => {
    server.use(
      http.get('/api/projects', async () => {
        await new Promise(() => {});
      })
    );

    render(<ProjectList />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders project list after loading', async () => {
    render(<ProjectList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Website Redesign')).toBeInTheDocument();
    });
    expect(screen.getByText('Mobile App MVP')).toBeInTheDocument();
  });

  it('filters projects based on search term', async () => {
    const user = userEvent.setup();
    render(<ProjectList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Website Redesign')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Search projects');
    await user.type(searchInput, 'Mobile');

    await waitFor(() => {
      expect(screen.queryByText('Website Redesign')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Mobile App MVP')).toBeInTheDocument();
  });

  it('shows error message on fetch failure', async () => {
    server.use(
      http.get('/api/projects', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<ProjectList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
