import { SortOption, sortOptions } from '@/types/sortOption'
import { ChevronDown, Settings } from 'lucide-react'
import { Link } from 'react-router'

interface SortSelectProps {
  sortBy: SortOption['value']
  setSortBy: React.Dispatch<React.SetStateAction<SortOption['value']>>
}

const SortSelect = ({ sortBy, setSortBy }: SortSelectProps) => {
  return (
    <div className="relative flex items-center gap-2">
      <div className="absolute left-4 z-20 flex items-center">
        <ChevronDown className="text-base-content h-4 w-4 opacity-70" />
      </div>
      <select
        className="select select-lg select-accent relative flex-1 ps-10"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortOption['value'])}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Link to="/settings" className="btn btn-ghost btn-circle">
        <Settings />
      </Link>
    </div>
  )
}

export default SortSelect
