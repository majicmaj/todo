import { Priority } from '@/types/todo'
import { ChevronDown, ChevronUp, Minus } from 'lucide-react'

const PriorityIcon = ({ priority }: { priority?: Priority }) => {
  if (priority === 'low')
    return <ChevronDown className="text-info" strokeWidth={4} />
  if (priority === 'medium')
    return <Minus className="text-warning" strokeWidth={4} />
  if (priority === 'high')
    return <ChevronUp className="text-error" strokeWidth={4} />
  return null
}

export default PriorityIcon
