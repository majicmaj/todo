import { SortOption, sortOptions } from '@/types/sortOption'
import { BarChart, Calendar, Minus, Settings, User } from 'lucide-react'
import { Link } from 'react-router'

interface SortSelectProps {
  sortBy: SortOption['value']
  setSortBy: React.Dispatch<React.SetStateAction<SortOption['value']>>
}

const SortIcon = ({ sortBy }: { sortBy: SortOption['value'] }) => {
  switch (sortBy) {
    case 'deadline':
      return <Calendar className="text-base-content h-4 w-4 opacity-70" />
    case 'priority':
      return <BarChart className="text-base-content h-4 w-4 opacity-70" />
    case 'assignee':
      return <User className="text-base-content h-4 w-4 opacity-70" />
    default:
      return <Minus className="text-base-content h-4 w-4 opacity-70" />
  }
}

const SortSelect = ({ sortBy, setSortBy }: SortSelectProps) => {
  return (
    <div className="relative flex items-center gap-2">
      <div className="absolute left-4 z-20 flex items-center">
        <SortIcon sortBy={sortBy} />
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
