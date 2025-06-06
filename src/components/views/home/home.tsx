import TodoItem from '@/components/todo/todoItem'
import { useGetCompletedTodos, useGetTodos } from '@/data/todo/todos'
import Todo from '@/types/todo'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import PageWrapper from '@/components/system/pageWrappers'
import ModeToggle from '@/components/system/modeToggle'
import { SortOption, sortOptions } from '@/types/sortOption'
import { parseISO, set } from 'date-fns'

const getDueFromDateTime = (date?: string, time?: string) => {
  const baseDate = date ? parseISO(date) : new Date()
  const [hours = '0', minutes = '0'] = time ? time.split(':') : ['0', '0']

  const dueDate = set(baseDate, {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: 0,
  })

  return dueDate
}

const Home = () => {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortOption['value']>('none')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { data: todos } = useGetTodos(search)
  const { data: completedTodos } = useGetCompletedTodos(search)

  const sortTodos = (todosToSort: Todo[]) => {
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

          console.log({
            aDue,
            bDue,
          })

          return bDue.getTime() - aDue.getTime()
        })

      default:
        return sorted
    }
  }

  const sortedTodos = sortTodos(todos)
  const sortedCompletedTodos = sortTodos(completedTodos)

  return (
    <PageWrapper>
      <div className="flex h-full flex-col overflow-auto">
        <Link to="/create" className="fixed right-6 bottom-6 z-20">
          <button className="btn btn-primary btn-xl aspect-square w-max rounded-xl p-1 text-2xl">
            <Plus />
          </button>
        </Link>

        <div className="flex flex-col gap-4 p-2">
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-2">
              <input
                placeholder="Search Todos"
                className="input input-lg input-accent w-full rounded-2xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <select
                  className="select select-lg select-accent rounded-2xl"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as SortOption['value'])
                  }
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ModeToggle />
              </div>
            </div>
          </motion.div>

          <motion.button
            className="btn btn-ghost rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.button>
        </div>

        <div className="bg-base-100 h-full min-h-max rounded-t-4xl p-6 pt-2 pb-24">
          <div className="flex flex-col gap-4">
            <div className="bg-base-100 border-base-300 sticky top-0 z-10 items-start justify-between border-b py-4">
              <h1 className="text-4xl font-bold">Todos</h1>
              <p className="text-base-content/60 text-xl font-semibold">
                {todos?.length} Items
              </p>
            </div>

            <AnimatePresence>
              {sortedTodos?.map((todo: Todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}

              {sortedTodos?.length === 0 && (
                <motion.div
                  layout
                  key="no-todos"
                  className="text-base-content/60 text-center text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  All done!
                </motion.div>
              )}

              <motion.div layout className="divider">
                Completed
              </motion.div>

              {sortedCompletedTodos?.map((todo: Todo) => (
                <TodoItem key={todo.id} todo={todo} isComplete />
              ))}

              {sortedCompletedTodos?.length === 0 && (
                <motion.div
                  layout
                  key="no-completed-todos"
                  className="text-base-content/60 text-center text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  None yet!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Home
