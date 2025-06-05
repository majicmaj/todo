import { useCompleteTodo, useUncompleteTodo } from '@/data/todo/todos'
import { cn } from '@/lib/utils'
import { Todo } from '@/types/todo.ts'

const TodoItem = ({
  todo,
  isComplete = false,
}: {
  todo: Todo
  isComplete?: boolean
}) => {
  const { mutate: completeTodo } = useCompleteTodo()
  const { mutate: uncompleteTodo } = useUncompleteTodo()

  const handleToggle = () => {
    if (todo.completed) {
      uncompleteTodo(todo.id)
    } else {
      completeTodo(todo.id)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        className="checkbox checkbox-accent"
        checked={todo.completed}
        onChange={handleToggle}
      />

      <div
        className={cn(
          'grid',
          isComplete && 'text-base-content/60 line-through',
        )}
      >
        <h2 className="text-2xl font-semibold">{todo.title}</h2>
        <p className="text-base-content/60 truncate font-semibold">
          {todo.description}
        </p>
      </div>
    </div>
  )
}

export default TodoItem
