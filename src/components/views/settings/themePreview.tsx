// Component to show a small preview of the theme
export const ThemePreview = ({ themeName }: { themeName: string }) => {
  return (
    <div
      data-theme={themeName}
      className="bg-base-300 flex size-24 flex-col gap-0.5 overflow-hidden rounded-md shadow-sm"
    >
      <div className="p-1">
        <div
          className="bg-base-100 border-accent h-2 w-full truncate border px-1 text-start text-sm font-normal"
          style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
        />
      </div>
      <div className="bg-base-100 relative flex h-full flex-col gap-1 rounded-t-lg p-1">
        <div className="flex flex-col gap-1 p-1">
          <div className="flex items-center gap-0.5">
            <div
              className="border-accent border p-0.5"
              style={{ borderRadius: 'calc(var(--radius-selector) / 5)' }}
            />
            <div
              className="bg-warning h-1 w-2"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
            <div
              className="bg-base-content/50 h-1 w-full"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
            <div
              className="bg-info h-1 w-4"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
          </div>
          <div
            className="bg-base-content/20 h-0.5 w-full"
            style={{ borderRadius: 'var(--radius-field)' }}
          />
        </div>

        <div className="flex flex-col gap-0.5 p-1">
          <div className="flex items-center gap-0.5">
            <div
              className="bg-accent border-accent border p-0.5"
              style={{ borderRadius: 'var(--radius-selector)' }}
            />
            <div
              className="bg-warning h-1 w-2 rounded"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
            <div
              className="bg-base-content/50 h-1 w-full"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
            <div
              className="bg-error h-1 w-4"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
          </div>
          <div
            className="bg-base-content/20 h-0.5 w-full"
            style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
          />
        </div>
        <div
          className="btn btn-xs btn-primary absolute right-1 bottom-1 grid size-3 place-items-center p-0"
          style={{ borderRadius: 'calc(var(--radius-selector) / 5)' }}
        />
      </div>
    </div>
  )
}
