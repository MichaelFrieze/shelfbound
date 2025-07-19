# AI Agent Guidelines - Shelfbound

This document provides comprehensive guidance for all AI agents working on the Shelfbound project.

## 📋 Primary Directive

**Before making any code changes or architectural decisions, consult ALL steering documents located in `docs/steering/`:**

- **`docs/steering/product.md`** - Product vision, principles, and roadmap
- **`docs/steering/structure.md`** - Project architecture and organization patterns
- **`docs/steering/tech.md`** - Technology stack, tools, and development workflow
- **`docs/steering/code-style.md`** - Code style guidelines and best practices

## 🎯 Core Instructions

### 1. Technology Stack Adherence

- **Use TanStack ecosystem** (Router, Query, Start) as the foundation
- **Follow React 19** and modern TypeScript patterns
- **Use Vite** for build tooling and development
- **Implement Tailwind CSS 4.0** for styling
- **Add Shadcn/ui components** using: `pnpx shadcn@latest add <component>`

### 2. Code Quality Standards

- **Maintain full TypeScript coverage** with strict settings
- **Use Zod schemas** for all data validation
- **Follow the code style guidelines** in `docs/steering/code-style.md`
- **Write tests** for all new functionality using Vitest and React Testing Library
- **Run quality checks** with `pnpm check` before committing changes

### 3. Architecture Patterns

- **Follow file-based routing** with TanStack Router in `src/routes/`
- **Use path aliases** (`@/components`, `@/lib`, etc.) for imports
- **Implement proper separation of concerns** as outlined in structure.md
- **Use TanStack Query** for all server state management
- **Follow component organization** patterns defined in structure.md

### 4. Development Workflow

```bash
# Always use pnpm for package management
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm check

# Add new Shadcn components
pnpx shadcn@latest add button
```

### 5. Error Handling & Validation

- **Use custom trycatch functions** for async operations
- **Implement Zod schemas** for runtime type validation
- **Handle errors gracefully** with proper user feedback
- **Use T3 Env** for environment variable validation

## 🚫 What NOT to Do

- **Don't use default exports** - prefer named exports
- **Don't bypass TypeScript** - maintain strict type safety
- **Don't ignore the steering docs** - always consult them first
- **Don't use inline styles** - use Tailwind CSS classes
- **Don't create files outside** the established directory structure
- **Don't use arrow functions** for main component declarations

## 🔄 When Making Changes

1. **Read relevant steering docs** before starting
2. **Understand the existing patterns** in the codebase
3. **Follow the established architecture** and conventions
4. **Test your changes** thoroughly
5. **Update documentation** if adding new patterns or features
6. **Run quality checks** before considering the work complete

## 📝 Documentation Updates

If you add new patterns, technologies, or make architectural changes:

- **Update the relevant steering documents**
- **Maintain consistency** across all documentation
- **Add examples** for complex implementations
- **Keep the AGENTS.md file** updated with new instructions

## 🎯 Success Criteria

Your work is successful when:

- ✅ All steering document guidelines are followed
- ✅ Code passes TypeScript compilation
- ✅ Tests pass and coverage is maintained
- ✅ Code style guidelines are adhered to
- ✅ Performance and accessibility standards are met
- ✅ Documentation is updated if necessary

---

**Remember**: These steering documents are your source of truth. When in doubt, refer to them first, then ask for clarification if needed.
