# Code Style Guidelines - Shelfbound

## General Principles

- **Prefer `type` imports**: `import { type ComponentProps } from "react"`
- **Use `@/` path alias** for src imports
- **Follow modular architecture** as outlined in structure.md (soon)
- **Use Tailwind CSS with `cn()` utility** for className merging
- **Component props**: destructure with defaults, use `...props` spread
- **Error handling**: Use custom trycatch function with proper error types
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Prefer `export { Component }` syntax**, not `export default`
- **Prefer function declarations over arrow functions** for components
- **Use Zod for schema validation** and type inference

## Import Organization

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

## Component Structure

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

## Naming Conventions

### Variables & Functions

- **Variables**: camelCase (`userData`, `isLoading`, `fetchCount`)
- **Functions**: camelCase (`getUserData`, `handleClick`, `formatDate`)

### Components & Types

- **Components**: PascalCase (`Button`, `UserProfile`, `LoginForm`)
- **Types/Interfaces**: PascalCase (`User`, `ApiResponse`, `ButtonProps`)

### File & Folder Names

- **All files**: kebab-case (`button.tsx`, `user-profile.tsx`, `api-client.ts`)
- **All folders**: kebab-case (`user-management/`, `api-handlers/`)
- **No capital letters** in file or folder names

## Directory Organization

Follow the structure outlined in `docs/steering/structure.md`:

```
src/components/
├── ui/          # Shadcn/ui components
├── layout/      # Layout-specific components
├── features/    # Feature-specific components
└── common/      # Shared utility components
```

## TypeScript Best Practices

- **Prefer interfaces over types** for object shapes
- **Use Zod schemas** for runtime validation
- **Leverage type inference** when possible

## Styling Guidelines

- **Use Tailwind CSS** as the primary styling solution
- **Use `cn()` utility** for conditional classes
- **Follow mobile-first** responsive design
- **Use CSS variables** for theming (configured in Shadcn)

## Error Handling

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

---

_These guidelines should be followed consistently across the entire codebase to maintain code quality and developer experience._
