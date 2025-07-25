import { DefaultCatchBoundary } from '@/components/default-catch-boundary.tsx'
import { NotFound } from '@/components/not-found.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { seo } from '@/lib/seo.ts'
import type { QueryClient } from '@tanstack/react-query'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'
import appCss from '../styles.css?url'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'ShelfBound | The best way to find books',
        description: `ShelfBound is the best way to find books.`,
      }),
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider
          defaultTheme="system"
          storageKey="shelfbound.theme"
          enableColorScheme
          disableTransitionOnChange
        >
          {children}
          <TanStackRouterDevtools />
          <TanStackQueryLayout />
          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  )
}
