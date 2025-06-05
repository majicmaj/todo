import TodoItem from '@/components/todo/todoItem'

import { useGetCompletedTodos, useGetTodos } from '@/data/todo/todos'
import { Todo } from '@/types/todo'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

const Home = () => {
  const [search, setSearch] = useState('')

  const { data: todos } = useGetTodos(search)
  const { data: completedTodos } = useGetCompletedTodos(search)

  return (
    <div className="flex flex-col">
      <Link to="/create">
        <button className="btn btn-primary btn-xl fixed right-6 bottom-6 aspect-square w-max rounded-xl p-1 text-2xl">
          <Plus />
        </button>
      </Link>

      <div className="p-4">
        <input
          placeholder="Search Todos"
          className="input input-lg input-accent w-full rounded-2xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-base-100 h-full rounded-t-4xl p-6 pt-2">
        <div className="flex flex-col gap-4">
          <div className="bg-base-100 border-base-300 sticky top-0 items-start justify-between border-b py-4">
            <h1 className="text-4xl font-bold">Todos</h1>
            <p className="text-base-content/60 text-xl font-semibold">
              {todos?.length} Todos
            </p>
          </div>
          {todos?.map((todo: Todo) => <TodoItem key={todo.id} todo={todo} />)}

          <div className="divider">Completed</div>

          {completedTodos?.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} isComplete />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
