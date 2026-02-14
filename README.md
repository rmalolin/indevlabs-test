# React Mini-App: Dashboard + Hooks

A React 19 project with Vite demonstrating a project dashboard with search filtering, routing, and a custom hook using React Query and MSW for data mocking.

## Features

- **Project List View**: Displays all projects with status badges
- **Search Filter**: Controlled form input to filter projects by name
- **Project Details**: Route-based detail view (`/project/:id`)
- **Custom Hook**: `useProjects()` and `useProject(id)` using React Query
- **MSW**: Mock Service Worker for API mocking
- **A11y**: `aria-label` on search input, `role="status"`, `role="alert"`
- **Error Boundary**: Graceful error handling with retry
- **Skeleton Loading**: Loading states with skeleton UI

## Tech Stack

- React 19
- Vite
- TypeScript (strict mode)
- Tailwind CSS
- React Router
- TanStack Query (React Query)
- MSW (Mock Service Worker)
- Vitest
- Prettier

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

## Running Tests

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm run test
```

## Code Quality

```bash
# TypeScript type check
npm run typecheck

# Lint
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

## Project Structure

```
src/
├── components/
│   ├── BackLink.tsx       # Back navigation link
│   ├── ErrorBoundary.tsx  # Error boundary with retry
│   ├── ErrorMessage.tsx  # Error alert component
│   ├── PageContainer.tsx # Page wrapper component
│   ├── ProjectList.tsx   # List view with search + skeletons
│   ├── ProjectDetail.tsx # Detail view with skeletons
│   └── StatusBadge.tsx  # Status badge component
├── hooks/
│   └── useProjects.ts    # Custom hooks with React Query
├── mocks/
│   ├── browser.ts        # MSW browser setup
│   ├── handlers.ts       # MSW request handlers
│   └── node/
│       ├── handlers.ts   # Node handlers for tests
│       └── server.ts    # MSW server for tests
├── App.tsx              # Router + QueryClient + lazy loading
├── main.tsx             # Entry point + MSW init
└── index.css            # Tailwind styles

tests/
├── setup.ts             # Test setup
└── ProjectList.test.tsx # Component tests
```
