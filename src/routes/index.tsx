import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  // loader: async () => {
  //   throw new Error('test')
  // },
})

function App() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl">Hello World</h1>
      <Button variant="outline" className="w-40">
        Click me
      </Button>
      <ModeToggle size="lg" variant="ghost" />
    </div>
  )
}
