import { useTheme } from '@/hooks/useTheme'
import PageWrapper from '@/components/system/pageWrappers'
import { ChevronLeft, Check, Search } from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// Component to show a small preview of the theme
const ThemePreview = ({ themeName }: { themeName: string }) => {
  return (
    <div
      data-theme={themeName}
      className="border-base-300 flex h-20 w-20 flex-col overflow-hidden rounded-lg border shadow-sm"
    >
      {/* Header area with primary color */}
      <div className="bg-primary flex h-2/5 items-center justify-between px-1.5">
        <div className="bg-primary-content h-2 w-2 rounded-full opacity-80"></div>
        <div className="bg-primary-content h-1 w-4 rounded-full opacity-60"></div>
      </div>

      {/* Content area with mini elements */}
      <div className="bg-base-100 flex h-3/5 flex-col justify-between p-1.5">
        {/* Mini button row */}
        <div className="flex items-center gap-1">
          <div className="bg-secondary h-2 w-3 flex-shrink-0 rounded-sm"></div>
          <div className="bg-accent h-2 w-3 flex-shrink-0 rounded-sm"></div>
        </div>

        {/* Mini content lines */}
        <div className="space-y-1">
          <div className="bg-base-200 h-1 w-full rounded-full"></div>
          <div className="bg-base-300 h-1 w-3/4 rounded-full"></div>
        </div>

        {/* Mini footer with info color */}
        <div className="flex w-full justify-end">
          <div className="bg-info h-1.5 w-3 rounded-sm"></div>
        </div>
      </div>
    </div>
  )
}

const Settings = () => {
  const { theme, setTheme, availableThemes } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')

  // Filter themes based on search query
  const filteredThemes = availableThemes.filter((themeName) =>
    themeName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group light/dark themes and others
  const basicThemes = ['light', 'dark']
  const otherThemes = filteredThemes.filter(
    (theme) => !basicThemes.includes(theme),
  )

  // Display basic themes first, then other themes
  const displayOrder = [
    ...basicThemes.filter((theme) => filteredThemes.includes(theme)),
    ...otherThemes,
  ]

  return (
    <PageWrapper>
      <div className="flex h-full flex-col overflow-auto">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="btn btn-ghost btn-sm">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>

        <div className="bg-base-100 h-full min-h-max rounded-t-4xl p-6 pb-24">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Theme</h2>

              {/* Search input */}
              <div className="relative mb-6">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <Search className="text-base-content h-4 w-4 opacity-70" />
                </div>
                <input
                  type="text"
                  className="input input-outline input-lg input-accent w-full"
                  placeholder="Search themes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {filteredThemes.length === 0 && (
                <div className="text-base-content py-8 text-center opacity-70">
                  No themes match your search
                </div>
              )}

              {/* Theme grid */}
              <div className="flex flex-wrap items-start justify-center gap-2">
                {displayOrder.map((themeName) => (
                  <button
                    key={themeName}
                    className={cn(
                      `btn xs:size-40 flex aspect-square size-32 flex-col justify-start gap-4 p-3 transition-all`,
                      theme === themeName && 'btn-primary',
                    )}
                    onClick={() => setTheme(themeName)}
                  >
                    <p className="flex w-full items-center justify-between gap-2 text-center">
                      <span className="flex-1 truncate text-left whitespace-nowrap capitalize">
                        {themeName}
                      </span>

                      {theme === themeName && (
                        <Check className="right-0 h-5 w-5" />
                      )}
                    </p>

                    <ThemePreview themeName={themeName} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Settings
