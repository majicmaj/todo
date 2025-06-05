import { Link } from 'react-router'
import { useCompleteTodo, useUncompleteTodo } from '@/data/todo/todos'
import { cn } from '@/lib/utils'
import Todo from '@/types/todo'
import { motion } from 'framer-motion'
import Deadline from './deadline'
import PriorityIcon from './priorityIcon'

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
      className="flex w-full items-start gap-4 rounded-lg"
    >
      <motion.input
        layout
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        type="checkbox"
        className="checkbox checkbox-accent mt-1.5"
        checked={todo.completed}
        onChange={handleToggle}
      />

      <motion.div
        layout
        className={cn(
          'flex min-w-0 flex-1 flex-col gap-1',
          isComplete && 'text-base-content/60 line-through',
        )}
      >
        <motion.div layout className="flex w-full items-center gap-2">
          <PriorityIcon priority={todo.priority} />
          <Link to={`/todo/${todo.id}`} className="flex-1 truncate">
            <motion.h2
              layout
              className="hover:text-accent truncate text-2xl font-semibold"
            >
              {todo.title}
            </motion.h2>
          </Link>
          <motion.div layout className="flex-shrink-0">
            <Deadline date={todo.dueDate} time={todo.dueTime} />
          </motion.div>
        </motion.div>

        {todo.description && (
          <motion.p
            layout
            className="text-base-content/60 line-clamp-2 text-sm"
          >
            {todo.description}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}

export default TodoItem
