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

function getSystemTheme(defaultTheme = 'light') {
  if (typeof window === 'undefined') return defaultTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getTheme() {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem('theme') // Return null if not set
  } catch (_) {
    console.error('Local storage not supported')
    return null
  }
}

function resolveTheme(theme: string | null) {
  if (!theme || theme === 'system') {
    return getSystemTheme()
  }
  return theme
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const storedTheme = getTheme()
  const [theme, setThemeValue] = useState(() => storedTheme || 'system')
  const [systemTheme, setSystemTheme] = useState(() => getSystemTheme())
  const [hasUserInteracted, setHasUserInteracted] = useState(() => {
    // User has interacted if there's a stored theme
    return storedTheme !== null
  })

  // Update resolvedTheme to use systemTheme state when theme is 'system'
  const resolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme
    }
    return theme
  }, [theme, systemTheme])

  const isDark = useMemo(() => resolvedTheme === 'dark', [resolvedTheme])

  const applyTheme = useCallback((newTheme: string) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }, [])

  // Apply theme on mount without writing to localStorage
  useEffect(() => {
    applyTheme(resolvedTheme)
  }, [applyTheme, resolvedTheme])

  const setTheme = useCallback(
    (newTheme: string, userInitiated = false) => {
      setThemeValue(newTheme)
      applyTheme(resolveTheme(newTheme))

      // Only write to localStorage if user initiated
      if (userInitiated) {
        setHasUserInteracted(true)
        try {
          localStorage.setItem('theme', newTheme)
        } catch (_) {
          console.error('Local storage not supported')
        }
      }
    },
    [applyTheme],
  )

  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme, true) // Mark as user-initiated
  }, [resolvedTheme, setTheme])

  const handleSystemThemeChanged = useCallback(() => {
    const newSystemTheme = getSystemTheme()
    setSystemTheme(newSystemTheme)
    if (theme === 'system') {
      applyTheme(newSystemTheme)
    }
  }, [theme, applyTheme])

  const handleStorageChange = useCallback(
    (e: StorageEvent) => {
      if (e.key === 'theme') {
        if (e.newValue) {
          setThemeValue(e.newValue)
          applyTheme(resolveTheme(e.newValue))
          setHasUserInteracted(true)
        } else if (hasUserInteracted) {
          // Only restore if user has previously interacted
          try {
            localStorage.setItem('theme', 'system')
          } catch (_) {}
          setThemeValue('system')
          applyTheme(getSystemTheme())
        }
      }
    },
    [applyTheme, hasUserInteracted],
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', handleSystemThemeChanged)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      media.removeEventListener('change', handleSystemThemeChanged)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [handleSystemThemeChanged, handleStorageChange])

  // Remove the periodic storage check entirely for lazy behavior

  const contextValue = useMemo(
    () => ({
      theme,
      resolvedTheme,
      isDark,
      setTheme: (theme: string) => setTheme(theme, true),
      toggleTheme,
    }),
    [theme, resolvedTheme, isDark, setTheme, toggleTheme],
  )

  return <ThemeContext value={contextValue}>{children}</ThemeContext>
}
