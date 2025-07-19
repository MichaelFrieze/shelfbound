# Structure Steering - Shelfbound

## Project Architecture

Shelfbound follows modern React application patterns with a focus on maintainability, type safety, and developer experience.

## Directory Structure

```
shelfbound/
├── docs/                    # Documentation and steering docs
│   └── steering/           # AI assistant guidance docs
├── public/                 # Static assets (favicon, images, etc.)
├── src/                    # Source code
│   ├── components/         # Reusable React components
│   │   └── ui/            # Shadcn/ui components (when added)
│   ├── integrations/       # Third-party service integrations
│   │   └── tanstack-query/ # TanStack Query setup
│   ├── lib/               # Utility functions and helpers
│   ├── routes/            # File-based routing (TanStack Router)
│   └── styles.css         # Global styles (Tailwind)
├── components.json         # Shadcn/ui configuration
└── vite.config.ts         # Build configuration
```

## Routing Structure

**File-Based Routing**: Uses TanStack Router for automatic route generation based on file structure in `src/routes/`

- `__root.tsx` - Root layout component with global providers
- `index.tsx` - Home page (/)
- `demo.*` files - Demo routes showing TanStack features
- `api.*` files - API route handlers

## Component Organization

### Current Components

- **Header**: Navigation component with links to demo routes
- **Layout Components**: Root document structure and TanStack integrations

### Planned Structure

```
src/components/
├── ui/          # Shadcn/ui components
├── layout/      # Layout-specific components
├── features/    # Feature-specific components
└── common/      # Shared utility components
```

## Data Flow Patterns

1. **TanStack Query**: For server state management and caching
2. **TanStack Router**: For routing state and navigation
3. **Local State**: React hooks for component-specific state
4. **Environment Variables**: T3 Env for type-safe environment configuration

## Code Organization Principles

1. **File-Based Routing**: Routes automatically generated from file structure
2. **Component Colocation**: Keep related components close to their usage
3. **Type Safety**: Full TypeScript coverage with Zod for runtime validation
4. **Separation of Concerns**: Clear boundaries between UI, data, and business logic
5. **Modular Integrations**: Third-party services organized in dedicated directories

## Import Alias Configuration

```typescript
{
  "@/components": "src/components",
  "@/lib": "src/lib",
  "@/utils": "src/lib/utils",
  "@/ui": "src/components/ui",
  "@/hooks": "src/hooks"
}
```

## State Management Strategy

- **Server State**: TanStack Query for API data, caching, and synchronization
- **Router State**: TanStack Router for navigation and URL state
- **Component State**: React hooks (useState, useReducer) for local UI state
- **Global State**: TanStack Store (when needed for complex global state)

## Testing Structure

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: Route and feature testing
- **E2E Tests**: _To be implemented_

## Build and Deployment

- **Development**: Vite dev server with hot reload
- **Build**: Vite production build with optimization
- **Deployment**: _To be configured_

---

_This structure supports scalable development while maintaining clean separation of concerns and excellent developer experience._
