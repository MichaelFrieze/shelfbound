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
4. **Integrations**: Third-party services organized in dedicated directories

## Code Style Guidelines

### General Principles

- **Prefer `type` imports**: `import { type ComponentProps } from "react"`
- **Use `@/` path alias** for src imports
- **Follow modular architecture** TODO: add more about this to docs
- **Use Tailwind CSS with `cn()` utility** for className merging
- **Component props**: destructure with defaults, use `...props` spread
- **Error handling**: Use custom trycatch function with proper error types
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Prefer `export { Component }` syntax**, not `export default`
- **Prefer function declarations over arrow functions** for components
- **Use Zod for schema validation** and type inference

### Import Organization

```typescript
// 1. Node modules
import React from 'react'
import { type ComponentProps } from 'react'

// 2. Internal modules (using @/ alias)
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// 3. Relative imports
import './styles.css'
```

### Component Structure

```typescript
import { type ComponentProps } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'base-button-classes',
        variant === 'primary' && 'primary-classes',
        size === 'sm' && 'small-classes',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }
```

### Naming Conventions

#### Variables & Functions

- **Variables**: camelCase (`userData`, `isLoading`, `fetchCount`)
- **Functions**: camelCase (`getUserData`, `handleClick`, `formatDate`)

#### Components & Types

- **Components**: PascalCase (`Button`, `UserProfile`, `LoginForm`)
- **Types/Interfaces**: PascalCase (`User`, `ApiResponse`, `ButtonProps`)

#### File & Folder Names

- **All files**: kebab-case (`button.tsx`, `user-profile.tsx`, `api-client.ts`)
- **All folders**: kebab-case (`user-management/`, `api-handlers/`)
- **No capital letters** in file or folder names

### TypeScript Best Practices

- **Prefer interfaces over types** for object shapes
- **Use Zod schemas** for runtime validation
- **Leverage type inference** when possible

### Styling Guidelines

- **Use Tailwind CSS** as the primary styling solution
- **Use `cn()` utility** for conditional classes
- **Follow mobile-first** responsive design
- **Use CSS variables** for theming (configured in Shadcn)

### Error Handling

Use the custom `tryCatch` function from `@/lib/try-catch` for async operations:

```typescript
import { tryCatch } from '@/lib/try-catch'

// Usage with discriminated union result
const result = await tryCatch(fetchUserData())

if (result.error) {
  // Handle error - TypeScript knows result.data is null
  console.error('Failed to fetch user:', result.error)
  return
}

// TypeScript knows result.error is null and result.data is available
const userData = result.data
```

**Benefits of this approach:**

- **Type-safe error handling** with discriminated unions
- **No tuple destructuring** - cleaner syntax
- **Explicit error checking** - forces proper error handling

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

## Build and Deployment

- **Development**: Vite dev server with hot reload
- **Build**: Vite production build with optimization
- **Deployment**: _To be configured_

---

_This structure and code style guidelines support scalable development while maintaining clean separation of concerns, consistent code quality, and excellent developer experience._
