# CLAUDE.md - Project Understanding

## Project Overview

A React 19 mini-app for managing projects with a dashboard, search filtering, and detail views.

## Tech Stack

- React 19
- Vite (build tool)
- TypeScript (strict mode)
- Tailwind CSS (styling)
- React Router (routing)
- TanStack Query (data fetching)
- MSW (API mocking)
- Vitest (testing)

## Project Structure

```
src/
├── components/          # React components
│   ├── BackLink.tsx       # Back navigation link
│   ├── ErrorBoundary.tsx  # Error boundary with retry
│   ├── ErrorMessage.tsx   # Error alert component
│   ├── PageContainer.tsx  # Page wrapper with maxWidth prop
│   ├── ProjectDetail.tsx   # Project detail page
│   ├── ProjectList.tsx     # Project list with search
│   └── StatusBadge.tsx    # Status badge component
├── hooks/              # Custom hooks
│   └── useProjects.ts     # useProjects() and useProject(id) hooks
├── mocks/              # MSW mock data
│   ├── browser.ts        # Browser MSW setup
│   ├── handlers.ts        # API handlers + Project type
│   └── node/             # Node MSW for tests
│       ├── handlers.ts
│       └── server.ts
├── App.tsx            # Main app with routing + lazy loading
├── main.tsx           # Entry point + MSW init
└── index.css          # Tailwind imports

tests/
├── setup.ts               # Test setup (jest-dom)
└── ProjectList.test.tsx  # Component tests with MSW
```

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Production build
npm run preview   # Preview production build
npm run test      # Run tests in watch mode
npm run test:run # Run tests once
npm run typecheck # TypeScript check
npm run lint      # ESLint
npm run format    # Prettier format
npm run format:check # Check formatting
```

## Routes

| Path           | Component     | Description                          |
| -------------- | ------------- | ------------------------------------ |
| `/`            | ProjectList   | List all projects with search filter |
| `/project/:id` | ProjectDetail | Show project details                 |

## API Endpoints (MSW)

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/projects`     | List all projects  |
| GET    | `/api/projects/:id` | Get single project |

## Types

```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'planning' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}
```

## Custom Hooks

- `useProjects()` - Returns QueryResult<Project[]>
- `useProject(id)` - Returns QueryResult<Project>

## Dependencies Key Packages

- `@tanstack/react-query` - Data fetching
- `react-router-dom` - Routing
- `msw` - Mock Service Worker
- `tailwindcss` - Styling
- `vitest` - Testing framework
