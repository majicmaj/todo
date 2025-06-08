import { useGetTodoTags } from '@/data/todo'
import { cn } from '@/lib/utils'

interface TagsSelectProps {
  selectedTags: string[]
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
}

const TagsSelect = ({ selectedTags, setSelectedTags }: TagsSelectProps) => {
  const { data: tagData } = useGetTodoTags()
  const { tags, counts } = tagData || {}
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        className={cn(
          `badge badge-lg whitespace-nowrap`,
          selectedTags.length === 0 ? 'badge-accent' : 'badge-ghost',
        )}
        onClick={() => setSelectedTags([])}
      >
        All Tags
      </button>
      {tags?.map((tag) => (
        <button
          key={tag}
          className={cn(
            `badge badge-lg whitespace-nowrap`,
            selectedTags.includes(tag) ? 'badge-accent' : 'badge-ghost',
          )}
          onClick={() => {
            setSelectedTags((prev) =>
              prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag],
            )
          }}
        >
          <span className="text-sm opacity-60">{counts?.[tag]}</span>
          {tag}
        </button>
      ))}
    </div>
  )
}

export default TagsSelect
