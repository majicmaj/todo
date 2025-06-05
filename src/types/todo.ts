interface Todo {
  id: string
  title: string
  description?: string
  dueDate?: string
  dueTime?: string
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
  assignedTo?: string
  createdAt: string
  updatedAt: string
  completed: boolean
}

export type { Todo }

export default Todo
