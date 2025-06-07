import { v4 as uuidv4 } from 'uuid'
import Todo from '@/types/todo'
import {
  TODOS_LOCAL_STORAGE_KEY,
  COMPLETE_TODOS_LOCAL_STORAGE_KEY,
} from './constants'

export const postTodo = async (todo: Todo) => {
  const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
  const parsedTodos = todos ? JSON.parse(todos) : []
  const newTodo = { ...todo, id: uuidv4() }
  parsedTodos.push(newTodo)
  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(parsedTodos))
  return newTodo
}

export const moveTodoToCompleted = async (id: string) => {
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

export const moveTodoToIncomplete = async (id: string) => {
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

export const deleteTodo = async (id: string) => {
  const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
  const parsedTodos = todos ? JSON.parse(todos) : []
  const todoIndex = parsedTodos.findIndex(
    (todo: { id: string }) => todo.id === id,
  )

  if (todoIndex === -1) throw new Error('Todo not found')

  parsedTodos.splice(todoIndex, 1)
  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(parsedTodos))
}

export const deleteCompletedTodo = async (id: string) => {
  const completedTodos = localStorage.getItem(COMPLETE_TODOS_LOCAL_STORAGE_KEY)
  const parsedCompletedTodos = completedTodos ? JSON.parse(completedTodos) : []
  const todoIndex = parsedCompletedTodos.findIndex(
    (todo: { id: string }) => todo.id === id,
  )

  if (todoIndex === -1) throw new Error('Todo not found')

  parsedCompletedTodos.splice(todoIndex, 1)
  localStorage.setItem(
    COMPLETE_TODOS_LOCAL_STORAGE_KEY,
    JSON.stringify(parsedCompletedTodos),
  )
}

export const updateTodo = async (todo: Partial<Todo>) => {
  const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
  const parsedTodos = todos ? JSON.parse(todos) : []
  const todoIndex = parsedTodos.findIndex(
    (t: { id: string }) => t.id === todo.id,
  )

  const completedTodos = localStorage.getItem(COMPLETE_TODOS_LOCAL_STORAGE_KEY)
  const parsedCompletedTodos = completedTodos ? JSON.parse(completedTodos) : []
  const completedTodoIndex = parsedCompletedTodos.findIndex(
    (t: { id: string }) => t.id === todo.id,
  )

  const notInTodos = todoIndex === -1
  const notInCompletedTodos = completedTodoIndex === -1
  if (notInTodos && notInCompletedTodos) throw new Error('Todo not found')

  if (notInTodos) {
    parsedCompletedTodos[completedTodoIndex] = {
      ...parsedCompletedTodos[completedTodoIndex],
      ...todo,
    }
    localStorage.setItem(
      COMPLETE_TODOS_LOCAL_STORAGE_KEY,
      JSON.stringify(parsedCompletedTodos),
    )
    return parsedCompletedTodos[completedTodoIndex]
  }

  parsedTodos[todoIndex] = { ...parsedTodos[todoIndex], ...todo }
  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(parsedTodos))
  return parsedTodos[todoIndex]
}
