import type { VariantProps } from 'class-variance-authority'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

import { useTheme } from './theme-provider'

interface ModeToggleProps extends VariantProps<typeof buttonVariants> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function ModeToggle({
  variant = 'outline',
  size = 'icon',
}: ModeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setTheme(newTheme)
  }

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    // For ghost variant, use small centered skeleton to match icon size
    if (variant === 'ghost') {
      return (
        <div
          className={cn(
            'flex items-center justify-center',
            size === 'sm' && 'h-8 w-8',
            size === 'lg' && 'h-10 w-10',
            size === 'icon' && 'size-9',
            size === 'default' && 'h-9 w-9',
          )}
        >
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      )
    }

    // For other variants, use full-size skeleton
    return (
      <Skeleton
        className={cn(
          'rounded-md',
          size === 'sm' && 'h-8 w-8',
          size === 'lg' && 'h-10 w-10',
          size === 'icon' && 'size-9',
          size === 'default' && 'h-9 w-9',
        )}
      />
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'group/toggle',
        size === 'sm' && 'w-8',
        size === 'lg' && 'w-10',
        size === 'default' && 'w-9',
        // icon size is already square (size-9)
      )}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

// Dropdown toggle
export function ThemeDropdown() {
  const { theme, setTheme } = useTheme()

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  )
}
