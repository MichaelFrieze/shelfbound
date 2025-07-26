import { createFileRoute } from '@tanstack/react-router'

import { ModeToggle, ThemeDropdown } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl">Hello World</h1>
      <Button variant="outline" className="w-40">
        Click me
      </Button>
      <ModeToggle size="lg" variant="ghost" />
      <ThemeDropdown />
    </div>
  )
}
