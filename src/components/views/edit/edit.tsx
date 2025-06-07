import { NEW_TODO_FORM_DEFAULT } from '@/constants/newTodoFormDefault'
import { useGetTodo, useUpdateTodo } from '@/data/todo'
import Todo from '@/types/todo'
import { Pen, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import PageWrapper from '@/components/system/pageWrappers'

const Edit = () => {
  const [todo, setTodo] = useState<Todo>(NEW_TODO_FORM_DEFAULT)

  const { id = '' } = useParams<{ id: string }>()
  const { data: existingTodo } = useGetTodo(id)

  // If an existing todo is found, set it to the state
  useEffect(() => {
    if (existingTodo) {
      setTodo(existingTodo)
    }
  }, [existingTodo])

  const { mutate: updateTodo } = useUpdateTodo()
  const navigate = useNavigate()

  const handleUpdateTodo = () => {
    updateTodo(todo, {
      onSuccess: () => {
        navigate('/')
      },
    })
  }

  return (
    <PageWrapper>
      <div className="flex h-full flex-col gap-4">
        <div className="relative flex items-center justify-center pt-4">
          <Link to="/" className="absolute left-0">
            <button className="btn btn-ghost">
              <X />
            </button>
          </Link>
          <h1 className="text-center font-bold">Edit Todo</h1>
        </div>

        <div className="bg-base-100 flex h-full flex-col gap-4 rounded-t-2xl p-6">
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
            onClick={handleUpdateTodo}
            disabled={!todo.title.trim()}
          >
            <Pen />
            Update Todo
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Edit
