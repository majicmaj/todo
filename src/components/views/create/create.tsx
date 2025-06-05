import { NEW_TODO_FORM_DEFAULT } from '@/constants/newTodoFormDefault'
import { usePostTodo } from '@/data/todo/todos'
import { type Todo } from '@/types/todo'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

const Create = () => {
  const [todo, setTodo] = useState<Todo>(NEW_TODO_FORM_DEFAULT)

  const { mutate: createTodo } = usePostTodo()
  const navigate = useNavigate()

  const handleCreateTodo = () => {
    createTodo(todo, {
      onSuccess: () => {
        navigate('/')
      },
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center justify-center pt-4">
        <Link to="/" className="absolute left-0">
          <button className="btn btn-ghost">
            <X />
          </button>
        </Link>
        <h1 className="text-center font-bold">Create Todo</h1>
      </div>

      <div className="bg-base-100 flex h-full flex-col gap-4 rounded-2xl p-6">
        <input
          className="input w-full py-6 text-2xl font-semibold"
          placeholder="Title"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <div className="divider">Optional</div>
        <textarea
          className="textarea w-full py-3 font-semibold"
          placeholder="Description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        {/* Due Date */}
        <input
          type="date"
          className="input w-full"
          value={todo.dueDate}
          onChange={(e) => setTodo({ ...todo, dueDate: e.target.value })}
        />
        {/* Due Time */}
        <input
          type="time"
          className="input w-full"
          value={todo.dueTime}
          onChange={(e) => setTodo({ ...todo, dueTime: e.target.value })}
        />
        <select
          className="select w-full"
          value={todo.priority}
          onChange={(e) =>
            setTodo({
              ...todo,
              priority: e.target.value as 'low' | 'medium' | 'high',
            })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="text"
          className="input w-full"
          placeholder="Assigned To"
          value={todo.assignedTo}
          onChange={(e) => setTodo({ ...todo, assignedTo: e.target.value })}
        />
        <div className="flex gap-2">
          <input
            type="text"
            className="input w-full"
            placeholder="Tags (comma separated)"
            value={todo.tags?.join(', ')}
            onChange={(e) =>
              setTodo({
                ...todo,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              })
            }
          />
        </div>

        <button
          className="btn btn-primary mt-4"
          onClick={handleCreateTodo}
          disabled={!todo.title.trim()}
        >
          <Plus />
          Create Todo
        </button>
      </div>
    </div>
  )
}

export default Create
