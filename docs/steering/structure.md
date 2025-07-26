# Structure Steering - Shelfbound

## Project Architecture

Shelfbound follows modern React application patterns with TanStack Router, Query, and Shadcn/ui components.

## Directory Structure

```
src/
├── components/         # Reusable React components
│   └── ui/            # Shadcn/ui components
├── integrations/       # Third-party service integrations
├── lib/               # Utility functions and helpers
├── routes/            # File-based routing (TanStack Router)
└── styles.css         # Global styles (Tailwind)
```

## Key Patterns

### Routing

- **File-Based Routing**: TanStack Router generates routes from `src/routes/` structure
- `__root.tsx` - Root layout with global providers
- `index.tsx` - Home page
- `demo.*` - Demo routes

### Component Organization

```
src/components/
├── ui/          # Shadcn/ui components
├── layout/      # Layout-specific components
├── features/    # Feature-specific components
└── common/      # Shared utility components
```

### State Management

- **Server State**: TanStack Query for API data and caching
- **Router State**: TanStack Router for navigation
- **Component State**: React hooks for local UI state
- **Environment Variables**: T3 Env for type-safe environment configuration

## Code Style Essentials

- Use `@/` path alias for src imports
- Prefer `type` imports: `import { type ComponentProps } from "react"`
- Use `cn()` utility for className merging
- Error handling: Use custom `tryCatch` function from `@/lib/try-catch`
- Naming: camelCase for variables/functions, PascalCase for components/types
- Files: kebab-case (`button.tsx`, `user-profile.tsx`)
- Prefer `export { Component }` over `export default`
- Use Zod for schema validation and type inference

### Error Handling Pattern

```typescript
import { tryCatch } from "@/lib/try-catch";

// Usage with discriminated union result
const result = await tryCatch(fetchUserData());

if (result.error) {
  // Handle error - TypeScript knows result.data is null
  console.error("Failed to fetch user:", result.error);
  return;
}

// TypeScript knows result.error is null and result.data is available
const userData = result.data;
```

**Benefits of this approach:**

- **Type-safe error handling** with discriminated unions
- **No tuple destructuring** - cleaner syntax
- **Explicit error checking** - forces proper error handling

## Component Structure Example

```typescript
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "base-button-classes",
        variant === "primary" && "primary-classes",
        size === "sm" && "small-classes",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
```

## Route Creation Checklist

When creating new routes in `src/routes/`:

1. **File naming**: Use kebab-case (`user-profile.tsx`, `api.users.tsx`)
2. **Route structure**: Follow TanStack Router conventions
3. **Include proper exports**: `createFileRoute` and route component
4. **Add route validation**: Use Zod schemas for search params and path params
5. **Handle loading states**: Use TanStack Query for data fetching
6. **Error boundaries**: Implement proper error handling

## Common Anti-Patterns to Avoid

- **Don't use default exports** - Always use named exports when possible
- **Don't bypass TypeScript** - Avoid `any` types or `@ts-ignore`
- **Don't use inline styles** - Use Tailwind classes with `cn()` utility
- **Don't create deeply nested component hierarchies** - Keep components flat and composable
- **Don't skip error handling** - Always wrap async operations with `tryCatch`
- **Don't ignore path aliases** - Use `@/` imports instead of relative paths
- **Don't use arrow functions for main components** - Use function declarations

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

## Import Organization

Biome automatically organizes imports using its default sorting order:

```typescript
// Node modules (packages)
import React from "react";
import { type ComponentProps } from "react";
// Internal modules (using @/ alias)
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// Relative imports
import "./styles.css";
```

The import order follows Biome's built-in sorting:

1. **Packages** - External dependencies (e.g., `react`, `@tanstack/react-router`)
2. **Aliases** - Internal paths using `@/` prefix for src imports
3. **Relative paths** - Local file imports (e.g., `./styles.css`, `../components`)

This organization is automatically enforced when `organizeImports` is enabled in the Biome configuration.
