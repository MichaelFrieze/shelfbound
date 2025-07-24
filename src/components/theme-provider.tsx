import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

const ThemeContext = createContext<{
  theme: string
  resolvedTheme: string
  isDark: boolean
  setTheme: (newTheme: string) => void
  toggleTheme: () => void
} | null>(null)

export function useTheme() {
  const themeContext = use(ThemeContext)
  if (!themeContext) {
    throw new Error('Not in ThemeProvider')
  }
  return themeContext
}

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light' // Default for SSR
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getTheme() {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem('theme') || 'system'
  } catch (_) {
    console.error('Local storage not supported')
    return 'system'
  }
}

function resolveTheme(theme: string) {
  if (theme === 'system') {
    return getSystemTheme()
  }
  return theme
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeValue] = useState(() => getTheme() || 'system')
  // Add state to force re-renders when system theme changes
  const [systemTheme, setSystemTheme] = useState(() => getSystemTheme())

  // Update resolvedTheme to use systemTheme state when theme is 'system'
  const resolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme
    }
    return theme
  }, [theme, systemTheme])

  // Add isDark as a computed value
  const isDark = useMemo(() => resolvedTheme === 'dark', [resolvedTheme])

  const applyTheme = useCallback((newTheme: string) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }, [])

  const setTheme = useCallback(
    (newTheme: string) => {
      setThemeValue(newTheme)
      applyTheme(resolveTheme(newTheme))
      try {
        localStorage.setItem('theme', newTheme)
      } catch (_) {
        console.error('Local storage not supported')
      }
    },
    [applyTheme],
  )

  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }, [resolvedTheme, setTheme])

  // Update system theme change handler to update state
  const handleSystemThemeChanged = useCallback(() => {
    const newSystemTheme = getSystemTheme()
    setSystemTheme(newSystemTheme)
    if (theme === 'system') {
      applyTheme(newSystemTheme)
    }
  }, [theme, applyTheme])

  // Add localStorage change listener
  const handleStorageChange = useCallback(
    (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        setThemeValue(e.newValue)
        applyTheme(resolveTheme(e.newValue))
      } else if (e.key === 'theme' && e.newValue === null) {
        // Handle deletion - reset to system
        setThemeValue('system')
        applyTheme(getSystemTheme())
      }
    },
    [applyTheme],
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', handleSystemThemeChanged)

    // Add storage event listener for manual localStorage changes
    window.addEventListener('storage', handleStorageChange)

    return () => {
      media.removeEventListener('change', handleSystemThemeChanged)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [handleSystemThemeChanged, handleStorageChange])

  const contextValue = useMemo(
    () => ({ theme, resolvedTheme, isDark, setTheme, toggleTheme }),
    [theme, resolvedTheme, isDark, setTheme, toggleTheme],
  )

  return <ThemeContext value={contextValue}>{children}</ThemeContext>
}
