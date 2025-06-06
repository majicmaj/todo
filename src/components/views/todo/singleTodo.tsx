import {
  useDeleteCompletedTodo,
  useDeleteTodo,
  useGetTodo,
} from '@/data/todo/todos'
import { format, parseISO } from 'date-fns'
import { ArrowLeft, Clock, Pen, Trash, User } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'
import PageWrapper from '@/components/system/pageWrappers'
import PriorityIcon from '@/components/todo/priorityIcon'
import Deadline from '@/components/todo/deadline'

const SingleTodo = () => {
  const { id } = useParams()
  const { data: todo } = useGetTodo(id || '')

  const { mutate: deleteTodo } = useDeleteTodo()
  const { mutate: deleteCompletedTodo } = useDeleteCompletedTodo()

  const navigate = useNavigate()

  if (!todo) return null

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      if (todo.completed) {
        deleteCompletedTodo(todo.id)
      } else {
        deleteTodo(todo.id)
      }
      navigate('/')
    }
  }

  return (
    <PageWrapper>
      <div className="flex h-full flex-col gap-4">
        <div className="relative flex items-center justify-between p-4">
          <Link to="/" className="btn btn-ghost btn-circle">
            <ArrowLeft />
          </Link>
          <Deadline date={todo.dueDate} time={todo.dueTime} />
        </div>

        <div className="bg-base-100 flex h-full flex-col gap-6 rounded-t-3xl p-6">
          <div className="flex items-start gap-2">
            <PriorityIcon priority={todo.priority} />
            <h1 className="flex-1 text-3xl font-bold">{todo.title}</h1>
          </div>

          {todo.description && (
            <p className="text-base-content/70 text-lg">{todo.description}</p>
          )}

          <div className="divider">Details</div>

          <div className="flex flex-col gap-4">
            {todo.dueDate && (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>
                  Due {format(parseISO(todo.dueDate), 'PPP')}
                  {todo.dueTime && ` at ${todo.dueTime}`}
                </span>
              </div>
            )}

            {todo.assignedTo && (
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Assigned to {todo.assignedTo}</span>
              </div>
            )}

            {todo.tags && todo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {todo.tags.map((tag: string) => (
                  <span key={tag} className="badge badge-lg">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="text-base-content/60 mt-4 flex flex-col gap-1 text-sm">
              <p>Created: {format(parseISO(todo.createdAt), 'PPp')}</p>
              <p>Updated: {format(parseISO(todo.updatedAt), 'PPp')}</p>
            </div>

            <Link to={`/edit/${todo.id}`} className="btn btn-primary">
              <Pen />
              Edit
            </Link>

            <button className="btn btn-error" onClick={handleDelete}>
              <Trash />
              Delete
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default SingleTodo
