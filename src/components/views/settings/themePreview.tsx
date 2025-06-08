// Component to show a small preview of the theme
export const ThemePreview = ({ themeName }: { themeName: string }) => {
  return (
    <div
      data-theme={themeName}
      className="bg-base-300 flex size-24 flex-col gap-0.5 overflow-hidden rounded-md shadow-sm"
    >
      <div className="p-1">
        <div className="bg-base-100 border-accent w-full truncate rounded border px-1 text-start text-sm font-normal">
          {themeName}
        </div>
      </div>
      <div className="bg-base-100 relative flex h-full flex-col gap-1 rounded-t-md p-1">
        <div className="flex flex-col gap-1 p-1">
          <div className="flex items-center gap-0.5">
            <div className="border-accent rounded-full border p-0.5" />
            <div className="bg-warning h-1 w-2 rounded-sm" />
            <div className="bg-base-content/50 h-1 w-full rounded" />
            <div className="bg-info h-1 w-4 rounded" />
          </div>
          <div className="bg-base-content/20 h-0.5 w-full rounded" />
        </div>
        <div className="flex flex-col gap-0.5 p-1">
          <div className="flex items-center gap-0.5">
            <div className="border-accent rounded-full border p-0.5" />
            <div className="bg-warning h-0.5 w-2 rounded-sm" />
            <div className="bg-base-content/50 h-0.75 w-full rounded" />
            <div className="bg-error h-1 w-4 rounded" />
          </div>
          <div className="bg-base-content/20 h-0.5 w-full rounded" />
        </div>
        <div className="btn btn-xs btn-primary absolute right-1 bottom-1 grid size-3 place-items-center rounded-xs p-0" />
      </div>
    </div>
  )
}
