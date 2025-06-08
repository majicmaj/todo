import TodoItem from '@/components/todo/todoItem'
import { useGetCompletedTodos, useGetTodos } from '@/data/todo'
import Todo from '@/types/todo'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import PageWrapper from '@/components/system/pageWrappers'
import { SortOption } from '@/types/sortOption'
import { sortTodos } from '@/utils/sortTodos'

import SortSelect from './sortSelect'
import TagsSelect from './tagsSelect'

const Home = () => {
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption['value']>('deadline')

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { data: todos } = useGetTodos(search, selectedTags)
  const { data: completedTodos } = useGetCompletedTodos(search, selectedTags)

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
            <div className="flex flex-col gap-4 p-2">
              <input
                placeholder="Search Todos"
                className="input input-lg input-accent w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
              <TagsSelect
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
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
                className="z-10 items-start justify-between"
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
