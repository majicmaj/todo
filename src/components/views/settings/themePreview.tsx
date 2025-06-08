// Component to show a small preview of the theme
export const ThemePreview = ({ themeName }: { themeName: string }) => {
  return (
    <div
      data-theme={themeName}
      className="bg-base-300 flex aspect-square w-full flex-col gap-0.5 overflow-hidden rounded-md shadow-md"
    >
      <div className="h-[16%] p-[4%]">
        <div
          className="bg-base-100 border-accent h-full w-full truncate border px-1 text-start text-sm font-normal"
          style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
        />
      </div>
      <div className="bg-base-100 relative flex h-full flex-col gap-[10%] rounded-t-lg p-[4%]">
        <div className="flex h-[15%] flex-col justify-between p-[2%]">
          <div className="flex items-center gap-[2%]">
            <div
              className="border-accent aspect-square w-[6%] border"
              style={{ borderRadius: 'calc(var(--radius-selector) / 5)' }}
            />
            <div
              className="bg-warning h-[30%] w-[8%] rounded"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
            <div
              className="bg-base-content/50 h-[60%] w-full"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
            <div
              className="bg-info h-[60%] w-[12%]"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
          </div>
          <div
            className="bg-base-content/20 h-[20%] w-full"
            style={{ borderRadius: 'var(--radius-field)' }}
          />
        </div>

        <div className="flex h-[15%] flex-col justify-between p-[2%]">
          <div className="flex items-center gap-[2%]">
            <div
              className="border-accent bg-accent aspect-square w-[6%] border"
              style={{ borderRadius: 'calc(var(--radius-selector) / 5)' }}
            />
            <div
              className="bg-warning h-[30%] w-[8%] rounded"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
            <div
              className="bg-base-content/50 h-[60%] w-full"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
            <div
              className="bg-error h-[60%] w-[12%]"
              style={{ borderRadius: 'calc(var(--radius-field) / 5)' }}
            />
          </div>
          <div
            className="bg-base-content/20 h-[20%] w-full"
            style={{ borderRadius: 'var(--radius-field)' }}
          />
        </div>

        <div
          className="btn btn-xs btn-primary absolute right-[5%] bottom-[5%] grid aspect-square h-[unset] w-[12%] place-items-center p-0"
          style={{ borderRadius: 'calc(var(--radius-box) / 5)' }}
        />
      </div>
    </div>
  )
}
