import TodoItem from '@/components/todo/todoItem'
import { useGetCompletedTodos, useGetTodos, useGetTodoTags } from '@/data/todo'
import Todo from '@/types/todo'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Plus, Settings } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import PageWrapper from '@/components/system/pageWrappers'
import { SortOption, sortOptions } from '@/types/sortOption'
import { sortTodos } from '@/utils/sortTodos'
import { cn } from '@/lib/utils'
import { ThemePreview } from '../settings/themePreview'

const Home = () => {
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption['value']>('deadline')

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { data: todos } = useGetTodos(search, selectedTags)
  const { data: completedTodos } = useGetCompletedTodos(search, selectedTags)
  const { data: tagData } = useGetTodoTags()
  const { tags, counts } = tagData || {}

  const sortedTodos = sortTodos(todos, sortBy)
  const sortedCompletedTodos = sortTodos(completedTodos, sortBy)

  return (
    <PageWrapper>
      <div className="flex h-full flex-col overflow-auto">
        <Link to="/create" className="fixed right-6 bottom-6 z-20">
          <button className="btn btn-primary btn-xl aspect-square w-max p-1 text-2xl">
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
              {/* Search */}
              <input
                placeholder="Search Todos"
                className="input input-lg input-accent w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* Sort */}
              <div className="flex items-center gap-2">
                <select
                  className="select select-lg select-accent flex-1"
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
                <Link to="/settings" className="btn btn-ghost btn-circle">
                  <Settings />
                </Link>
              </div>

              {/* Tags */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  className={cn(
                    `badge badge-lg whitespace-nowrap`,
                    selectedTags.length === 0 ? 'badge-primary' : 'badge-ghost',
                  )}
                  onClick={() => setSelectedTags([])}
                >
                  All Tags
                </button>
                {tags?.map((tag) => (
                  <button
                    key={tag}
                    className={cn(
                      `badge badge-lg whitespace-nowrap`,
                      selectedTags.includes(tag)
                        ? 'badge-primary'
                        : 'badge-ghost',
                    )}
                    onClick={() => {
                      setSelectedTags((prev) =>
                        prev.includes(tag)
                          ? prev.filter((t) => t !== tag)
                          : [...prev, tag],
                      )
                    }}
                  >
                    <span className="text-sm opacity-60">{counts?.[tag]}</span>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <button
            className="btn btn-ghost btn-xs"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.span animate={{ rotate: isMenuOpen ? 180 : 0 }}>
              <ChevronDown className="h-6 w-6" />
            </motion.span>
          </button>
        </div>

        <div className="bg-base-100 h-full min-h-max rounded-t-4xl p-6 pb-24">
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              <motion.div
                className="bg-base-100 border-base-300 z-10 items-start justify-between"
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-4xl font-bold">Todos</h1>
                <p className="text-base-content/60 text-sm font-semibold">
                  {todos?.length} Todos
                </p>
              </motion.div>
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

              <div className="divider">Completed</div>

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
