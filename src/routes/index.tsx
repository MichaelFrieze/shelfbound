import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col gap-2">
      <h1>Hello World</h1>
      <Button variant="outline" className="w-40">
        Click me
      </Button>
    </div>
  )
}
