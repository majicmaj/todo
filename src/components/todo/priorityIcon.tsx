import { Priority } from '@/types/todo'
import { ChevronDown, ChevronUp, Minus } from 'lucide-react'

const PriorityIcon = ({ priority }: { priority?: Priority }) => {
  if (priority === 'low') return <ChevronDown className="text-info" />
  if (priority === 'medium') return <Minus className="text-warning" />
  if (priority === 'high') return <ChevronUp className="text-error" />
  return null
}

export default PriorityIcon
