import { useCompleteTodo, useUncompleteTodo } from '@/data/todo/todos'
import { cn } from '@/lib/utils'
import Todo from '@/types/todo'
import { motion } from 'framer-motion'

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
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-4"
    >
      <motion.input
        layout
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        type="checkbox"
        className="checkbox checkbox-accent"
        checked={todo.completed}
        onChange={handleToggle}
      />

      <motion.div
        layout
        className={cn(
          'grid',
          isComplete && 'text-base-content/60 line-through',
        )}
      >
        <motion.h2 layout className="text-2xl font-semibold">
          {todo.title}
        </motion.h2>
        <motion.p
          layout
          className="text-base-content/60 truncate font-semibold"
        >
          {todo.description}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default TodoItem
