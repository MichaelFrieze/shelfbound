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

  // Add resolvedTheme as a computed value
  const resolvedTheme = useMemo(() => resolveTheme(theme), [theme])

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
    const newTheme = resolveTheme(theme) === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }, [theme, setTheme])

  const handleSystemThemeChanged = useCallback(() => {
    if (theme === 'system') {
      return applyTheme(getSystemTheme())
    }
  }, [theme, applyTheme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', handleSystemThemeChanged)
    return () => media.removeEventListener('change', handleSystemThemeChanged)
  }, [handleSystemThemeChanged])

  const contextValue = useMemo(
    () => ({ theme, resolvedTheme, isDark, setTheme, toggleTheme }),
    [theme, resolvedTheme, isDark, setTheme, toggleTheme],
  )

  return <ThemeContext value={contextValue}>{children}</ThemeContext>
}
