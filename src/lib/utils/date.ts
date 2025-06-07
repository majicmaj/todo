import {
  formatDistanceToNow,
  isAfter,
  parseISO,
  set,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns'

export const getDeadlineInfo = (date?: string, time?: string) => {
  if (!date && !time) return null

  const baseDate = date ? parseISO(date) : new Date()
  const [hours = '0', minutes = '0'] = time ? time.split(':') : ['0', '0']

  const dueDate = set(baseDate, {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: 0,
  })

  const now = new Date()
  const isOverdue = !isAfter(dueDate, now)
  const hoursUntilDue = differenceInHours(dueDate, now)

  let variant: 'error' | 'warning' | 'success' | 'info' = 'info'
  let text: string

  if (isOverdue) {
    variant = 'error'
    const years = differenceInYears(now, dueDate)
    const months = differenceInMonths(now, dueDate)
    const days = differenceInDays(now, dueDate)
    const hours = differenceInHours(now, dueDate)

    if (years > 0) {
      text = `${years}y overdue`
    } else if (months > 0) {
      text = `${months}m overdue`
    } else if (days > 0) {
      text = `${days}d overdue`
    } else {
      text = `${hours}h overdue`
    }
  } else {
    if (hoursUntilDue <= 24) {
      variant = 'warning'
    } else if (hoursUntilDue <= 72) {
      variant = 'success'
    }
    text = formatDistanceToNow(dueDate, { addSuffix: true })
  }

  return { text, variant }
}
