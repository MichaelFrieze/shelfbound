import { tryCatch } from '@/lib/try-catch'
import type { ErrorComponentProps } from '@tanstack/react-router'
import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router'
import { Button } from './ui/button'

export function DefaultCatchBoundary({ error, reset }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  console.error(error)

  return (
    <div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
      <ErrorComponent error={error} />
      <div className="flex gap-2 items-center flex-wrap">
        <Button
          onClick={reset}
          className="px-2 py-1 font-extrabold cursor-pointer"
          variant="outline"
        >
          Try Again
        </Button>
        <Button
          onClick={async () => {
            const result = await tryCatch(router.invalidate())

            if (result.error) {
              console.warn('Failed to invalidate data:', result.error)
            }

            reset()
          }}
          className="px-2 py-1 font-extrabold cursor-pointer"
          variant="outline"
        >
          Invalidate Data
        </Button>
        {isRoot ? (
          <Button asChild className="px-2 py-1 font-extrabold">
            <Link to="/">Home</Link>
          </Button>
        ) : (
          <Button asChild className="px-2 py-1 font-extrabold">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault()
                window.history.back()
              }}
            >
              Go Back
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
