import { parseISO, set } from 'date-fns'

export const getDueFromDateTime = (date?: string, time?: string) => {
  const baseDate = date ? parseISO(date) : new Date()
  const [hours = '0', minutes = '0'] = time ? time.split(':') : ['0', '0']

  const dueDate = set(baseDate, {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: 0,
  })

  return dueDate
}
