# Tech Stack Steering - Shelfbound

## Core Technologies

### Framework & Runtime

- **React 19**: Latest React with modern features and performance improvements
- **TypeScript 5.7+**: Full type safety with latest TypeScript features
- **Node.js**: Runtime environment (version managed by project requirements)

### Build & Development Tools

- **Vite 6+**: Ultra-fast build tool and dev server
- **pnpm**: Fast, disk-efficient package manager
- **TanStack Start**: Full-stack React framework with SSR capabilities

### Routing & Navigation

- **TanStack Router 1.121+**: Type-safe, file-based routing with powerful features
  - Automatic route generation
  - Type-safe navigation
  - Route-based code splitting
  - Search params validation
  - Loader functions for data fetching

### State Management & Data Fetching

- **TanStack Query 5.66+**: Powerful server state management
  - Data fetching and caching
  - Background synchronization
  - Optimistic updates
  - DevTools integration
- **Zod 3.24+**: Runtime schema validation and TypeScript integration

### Styling & UI

- **Tailwind CSS 4.0+**: Utility-first CSS framework with latest features
- **Shadcn/ui**: High-quality, accessible component library
  - New York style preset
  - Lucide React icons
  - CSS variables for theming
  - Class variance authority for component variants
- **Tailwind Merge**: Intelligent Tailwind class merging
- **tailwindcss-animate**: Animation utilities

### Environment & Configuration

- **T3 Env**: Type-safe environment variable handling
- **Vite Config**: Path aliases and plugin configuration
- **TypeScript Config**: Strict type checking configuration

### Code Quality

- **ESLint**: Code linting with TanStack configuration
- **Prettier**: Code formatting

## Development Workflow

### Package Management

```bash
# Install dependencies
pnpm install

# Add new dependencies
pnpm add <package>
pnpm add -D <dev-package>
```

### Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm serve

# Run tests
pnpm test

# Code quality
pnpm lint
pnpm format
pnpm check
```

### Component Development

```bash
# Add Shadcn components (use latest version)
pnpx shadcn@latest add button
pnpx shadcn@latest add card
pnpx shadcn@latest add form
```

## Architecture Decisions

### Why TanStack Ecosystem?

- **Unified Experience**: Cohesive tools that work seamlessly together
- **Type Safety**: Full TypeScript support across the stack
- **Performance**: Optimized for modern React patterns
- **Developer Experience**: Excellent DevTools and documentation
- **Community**: Active maintenance and strong community support

### Why Vite?

- **Speed**: Fastest development experience with HMR
- **Modern**: ES modules and modern JavaScript features
- **Plugin Ecosystem**: Rich plugin ecosystem
- **Build Optimization**: Excellent production builds

### Why Tailwind CSS 4.0?

- **Performance**: New CSS engine for better performance
- **Modern Features**: Latest CSS capabilities
- **Developer Experience**: Improved tooling and intellisense
- **Utility-First**: Rapid UI development

## Environment Configuration

### Required Environment Variables

```bash
# Optional - App title
VITE_APP_TITLE=Shelfbound

# Optional - Server URL for API calls
SERVER_URL=https://api.example.com
```

### Type Safety

All environment variables are validated at runtime using T3 Env and Zod schemas.

## Performance Considerations

1. **Code Splitting**: Automatic route-based splitting with TanStack Router
2. **Caching**: Intelligent caching with TanStack Query
3. **Bundle Analysis**: Use Vite bundle analyzer for optimization
4. **Tree Shaking**: Automatic dead code elimination
5. **Modern JavaScript**: Target modern browsers for smaller bundles

## Security Best Practices

1. **Environment Variables**: Never expose secrets to client-side code
2. **Type Validation**: Runtime validation of all external data with Zod
3. **Dependencies**: Regular security audits with `pnpm audit`
4. **CSP**: Content Security Policy headers (to be configured)

## Monitoring & DevTools

- **TanStack Router DevTools**: Route and navigation debugging
- **TanStack Query DevTools**: Query state and cache inspection
- **React DevTools**: Component tree and props inspection
- **Vite DevTools**: Build and module analysis

## Upgrade Strategy

1. **Regular Updates**: Keep dependencies updated for security and performance
2. **TanStack Ecosystem**: Coordinate updates across TanStack packages
3. **Documentation**: Update tech docs when making architectural changes

---

_This tech stack provides a modern, performant, and maintainable foundation for scalable web application development._
