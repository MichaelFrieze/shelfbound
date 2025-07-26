import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { NotFound } from './components/not-found'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
import './styles.css'

import { DefaultCatchBoundary } from './components/default-catch-boundary'
import { routeTree } from './routeTree.gen'

export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context: {
        ...TanstackQuery.getContext(),
      },
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,
      defaultPreload: 'intent',
      defaultErrorComponent: ({ error, reset }) => (
        <DefaultCatchBoundary error={error} reset={reset} />
      ),
      defaultNotFoundComponent: () => <NotFound />,
    }),
    TanstackQuery.getContext().queryClient,
  )

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
