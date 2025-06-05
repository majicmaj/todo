import Todo from '@/types/todo'
import { v4 as uuidv4 } from 'uuid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const TODOS_LOCAL_STORAGE_KEY = 'todos'
export const COMPLETE_TODOS_LOCAL_STORAGE_KEY = 'completedTodos'

export const useGetTodos = (search?: string) => {
  return useQuery({
    queryKey: [TODOS_LOCAL_STORAGE_KEY, search],
    queryFn: () => {
      const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)

      if (!todos) return []
      if (!search) {
        return JSON.parse(todos)
      }
      const parsedTodos = JSON.parse(todos)
      return parsedTodos.filter(
        (todo: Todo) =>
          todo.title.toLowerCase().includes(search.toLowerCase()) ||
          todo.description?.toLowerCase().includes(search.toLowerCase()),
      )
    },
  })
}

export const useGetTodo = (id: string) => {
  return useQuery({
    queryKey: [TODOS_LOCAL_STORAGE_KEY, id],
    queryFn: () => {
      const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
      if (!todos) return null
      const parsedTodos = JSON.parse(todos)
      return parsedTodos.find((todo: { id: string }) => todo.id === id) || null
    },
  })
}

const postTodo = async (todo: Todo) => {
  const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
  const parsedTodos = todos ? JSON.parse(todos) : []
  const newTodo = { ...todo, id: uuidv4() }
  parsedTodos.push(newTodo)
  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(parsedTodos))
  return newTodo
}

export const usePostTodo = () => {
  return useMutation({
    mutationFn: postTodo,
  })
}

export const useGetCompletedTodos = (search?: string) => {
  return useQuery({
    queryKey: [COMPLETE_TODOS_LOCAL_STORAGE_KEY, search],
    queryFn: () => {
      const completedTodos = localStorage.getItem(
        COMPLETE_TODOS_LOCAL_STORAGE_KEY,
      )
      if (!completedTodos) return []
      if (!search) {
        return JSON.parse(completedTodos)
      }
      const parsedCompletedTodos = JSON.parse(completedTodos)
      return parsedCompletedTodos.filter(
        (todo: Todo) =>
          todo.title.toLowerCase().includes(search.toLowerCase()) ||
          todo.description?.toLowerCase().includes(search.toLowerCase()),
      )
    },
  })
}

const moveTodoToCompleted = async (id: string) => {
  const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
  const parsedTodos = todos ? JSON.parse(todos) : []
  const todoIndex = parsedTodos.findIndex(
    (todo: { id: string }) => todo.id === id,
  )

  if (todoIndex === -1) throw new Error('Todo not found')

  const [completedTodo] = parsedTodos.splice(todoIndex, 1)
  completedTodo.completed = true

  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(parsedTodos))

  const completedTodos = localStorage.getItem(COMPLETE_TODOS_LOCAL_STORAGE_KEY)
  const parsedCompletedTodos = completedTodos ? JSON.parse(completedTodos) : []
  parsedCompletedTodos.push(completedTodo)
  localStorage.setItem(
    COMPLETE_TODOS_LOCAL_STORAGE_KEY,
    JSON.stringify(parsedCompletedTodos),
  )

  return completedTodo
}

export const useCompleteTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: moveTodoToCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TODOS_LOCAL_STORAGE_KEY],
      })
      queryClient.invalidateQueries({
        queryKey: [COMPLETE_TODOS_LOCAL_STORAGE_KEY],
      })
    },
  })
}

const moveTodoToIncomplete = async (id: string) => {
  const completedTodos = localStorage.getItem(COMPLETE_TODOS_LOCAL_STORAGE_KEY)
  const parsedCompletedTodos = completedTodos ? JSON.parse(completedTodos) : []
  const todoIndex = parsedCompletedTodos.findIndex(
    (todo: { id: string }) => todo.id === id,
  )

  if (todoIndex === -1) throw new Error('Todo not found')

  const [uncompletedTodo] = parsedCompletedTodos.splice(todoIndex, 1)
  uncompletedTodo.completed = false

  localStorage.setItem(
    COMPLETE_TODOS_LOCAL_STORAGE_KEY,
    JSON.stringify(parsedCompletedTodos),
  )

  const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
  const parsedTodos = todos ? JSON.parse(todos) : []
  parsedTodos.push(uncompletedTodo)
  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(parsedTodos))

  return uncompletedTodo
}

export const useUncompleteTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: moveTodoToIncomplete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TODOS_LOCAL_STORAGE_KEY],
      })
      queryClient.invalidateQueries({
        queryKey: [COMPLETE_TODOS_LOCAL_STORAGE_KEY],
      })
    },
  })
}
