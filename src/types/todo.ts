export type Priority = 'low' | 'medium' | 'high'

interface Todo {
  id: string
  title: string
  description?: string
  dueDate?: string
  dueTime?: string
  priority?: Priority
  tags?: string[]
  assignedTo?: string
  createdAt: string
  updatedAt: string
  completed: boolean
}

export type { Todo }

export default Todo
