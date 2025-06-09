import { useTheme } from '@/hooks/useTheme'
import PageWrapper from '@/components/system/pageWrappers'
import { ChevronLeft, Search } from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ThemePreview } from './themePreview'

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
              <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {displayOrder.map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => setTheme(themeName)}
                    className={cn(
                      'btn relative flex aspect-square h-[unset] flex-col overflow-hidden p-0 pb-2',
                      theme === themeName
                        ? 'btn-primary shadow-lg'
                        : 'btn btn-soft',
                    )}
                  >
                    <ThemePreview themeName={themeName} />
                    <div className="flex w-full items-center justify-start ps-2">
                      <input
                        type="radio"
                        name="theme"
                        className={cn(
                          'radio mr-2',
                          theme === themeName
                            ? 'radio-primary radio-outline'
                            : 'radio-ghost',
                        )}
                        checked={theme === themeName}
                        onChange={() => setTheme(themeName)}
                      />
                      <p>{themeName}</p>
                    </div>
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
