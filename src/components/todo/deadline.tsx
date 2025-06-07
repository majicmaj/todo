import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getDeadlineInfo } from '@/lib/utils/date'

interface DeadLineProps {
  date?: string
  time?: string
  isComplete?: boolean
}

const Deadline = ({ date, time, isComplete }: DeadLineProps) => {
  const deadlineInfo = getDeadlineInfo(date, time)

  if (!deadlineInfo || isComplete) return null

  const variantStyles = {
    error: 'badge-error',
    warning: 'badge-warning',
    success: 'badge-success',
    info: 'badge-info',
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'badge badge-md gap-2 px-1.5',
        variantStyles[deadlineInfo.variant],
      )}
    >
      <Clock className="h-3 w-3" />
      <span>{deadlineInfo.text}</span>
    </motion.div>
  )
}

export default Deadline
