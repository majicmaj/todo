import Todo from '@/types/todo'
import { getDueFromDateTime } from './getDueFromDateTime'
import { SortOption } from '@/types/sortOption'

export const sortTodos = (todosToSort: Todo[], sortBy: SortOption['value']) => {
  if (!todosToSort) return []

  const sorted = [...todosToSort]
  switch (sortBy) {
    case 'priority':
      return sorted.sort((a, b) => {
        const priorityOrder = ['low', 'medium', 'high']
        const aPriorityIndex = priorityOrder.indexOf(a.priority || 'low')
        const bPriorityIndex = priorityOrder.indexOf(b.priority || 'low')
        return bPriorityIndex - aPriorityIndex
      })

    case 'assignee':
      return sorted.sort((a, b) =>
        (a?.assignedTo || '').localeCompare(b?.assignedTo || ''),
      )

    case 'deadline':
      return sorted.sort((a, b) => {
        const { dueTime: aTime, dueDate: aDate } = a || {}
        const { dueTime: bTime, dueDate: bDate } = b || {}

        const aDue = getDueFromDateTime(aDate, aTime)
        const bDue = getDueFromDateTime(bDate, bTime)

        return aDue.getTime() - bDue.getTime()
      })

    default:
      return sorted
  }
}
