import { Todo } from '@/types/todo'

export const NEW_TODO_FORM_DEFAULT: Todo = {
  id: '',
  title: '',
  description: '',
  dueDate: '',
  dueTime: '',
  priority: 'medium',
  tags: [],
  assignedTo: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
}
