import { createContext, useEffect, useState } from 'react'

// Define the list of available themes
const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'coffee',
  'winter',
  'nord',
  'sunset',
  'oxygenos',
  'oxygenos-dark',
  'nothingos',
  'witchtech',
  'ash-sorbet',
]

type Theme = string

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  availableThemes: string[]
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
  availableThemes: THEMES,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function ThemeProvider({
  children,
  defaultTheme = 'ash-sorbet',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes
    root.removeAttribute('data-theme')

    // Apply the selected theme
    root.setAttribute('data-theme', theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    availableThemes: THEMES,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export { ThemeProvider, ThemeProviderContext }
