import { motion } from 'framer-motion'
import {
  formatDistanceToNow,
  isAfter,
  parseISO,
  set,
  differenceInHours,
} from 'date-fns'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DeadLineProps {
  date?: string
  time?: string
  isComplete?: boolean
}

const getDeadlineInfo = (date?: string, time?: string) => {
  if (!date && !time) return null

  const baseDate = date ? parseISO(date) : new Date()
  const [hours = '00', minutes = '00'] = (time || '').split(':')

  const dueDate = set(baseDate, {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: 0,
  })

  const now = new Date()
  const isOverdue = !isAfter(dueDate, now)
  const hoursUntilDue = differenceInHours(dueDate, now)

  let variant: 'error' | 'warning' | 'success' | 'info' = 'info'

  if (isOverdue) {
    variant = 'error'
  } else if (hoursUntilDue <= 24) {
    variant = 'warning'
  } else if (hoursUntilDue <= 72) {
    variant = 'success'
  }

  return {
    text: isOverdue
      ? 'Overdue'
      : formatDistanceToNow(dueDate, { addSuffix: true }),
    variant,
  }
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
        'badge badge-lg gap-2',
        variantStyles[deadlineInfo.variant],
      )}
    >
      <Clock className="h-3 w-3" />
      <span>{deadlineInfo.text}</span>
    </motion.div>
  )
}

export default Deadline
