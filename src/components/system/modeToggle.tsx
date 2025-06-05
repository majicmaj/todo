import { useTheme } from '@/hooks/useTheme'

const VALUES_MAP = {
  light: 'pastel',
  dark: 'dark',
}

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <input
      type="checkbox"
      className="toggle toggle-primary theme-controller"
      checked={theme === 'dark'}
      value={VALUES_MAP[theme as keyof typeof VALUES_MAP]}
      onChange={(e) => {
        setTheme(e.target.checked ? 'dark' : 'light')
      }}
      aria-label="Toggle dark mode"
    />
  )
}

export function HiddenModeToggle() {
  const { theme } = useTheme()

  return (
    <input
      type="checkbox"
      className="toggle toggle-primary theme-controller hidden"
      checked={theme === 'dark'}
      value={VALUES_MAP[theme as keyof typeof VALUES_MAP]}
      aria-label="Toggle dark mode"
    />
  )
}

export default ModeToggle
