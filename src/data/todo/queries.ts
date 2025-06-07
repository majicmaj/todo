import { useQuery } from '@tanstack/react-query'
import Todo from '@/types/todo'
import {
  TODOS_LOCAL_STORAGE_KEY,
  COMPLETE_TODOS_LOCAL_STORAGE_KEY,
} from './constants'

export const useGetTodo = (id: string) => {
  return useQuery({
    queryKey: [TODOS_LOCAL_STORAGE_KEY, id],
    queryFn: () => {
      const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
      const completeTodos = localStorage.getItem(
        COMPLETE_TODOS_LOCAL_STORAGE_KEY,
      )

      if (!todos && !completeTodos) return null
      if (completeTodos) {
        const parsedCompleteTodos = JSON.parse(completeTodos)
        const foundTodo = parsedCompleteTodos.find(
          (todo: { id: string }) => todo.id === id,
        )
        if (foundTodo) return foundTodo
      }
      if (todos) {
        const parsedTodos = JSON.parse(todos)
        const foundTodo = parsedTodos.find(
          (todo: { id: string }) => todo.id === id,
        )
        if (foundTodo) return foundTodo
      }
      return null
    },
  })
}

export const useGetTodos = (search?: string, tags?: string[]) => {
  return useQuery({
    queryKey: [TODOS_LOCAL_STORAGE_KEY, search, tags],
    queryFn: () => {
      const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)

      if (!todos) return []

      const parsedTodos = JSON.parse(todos)
      const searchedTodos = search
        ? parsedTodos.filter((todo: Todo) =>
            todo.description?.toLowerCase().includes(search.toLowerCase()),
          )
        : parsedTodos

      const tagFilteredTodos = searchedTodos.filter((todo: Todo) => {
        if (!tags || tags.length === 0) return true
        return todo.tags && todo.tags.some((tag) => tags.includes(tag))
      })

      return tagFilteredTodos
    },
  })
}

export const useGetCompletedTodos = (search?: string, tags?: string[]) => {
  return useQuery({
    queryKey: [COMPLETE_TODOS_LOCAL_STORAGE_KEY, search, tags],
    queryFn: () => {
      const completedTodos = localStorage.getItem(
        COMPLETE_TODOS_LOCAL_STORAGE_KEY,
      )
      if (!completedTodos) return []

      const parsedCompletedTodos = JSON.parse(completedTodos)
      const searchedTodos = search
        ? parsedCompletedTodos.filter((todo: Todo) =>
            todo.description?.toLowerCase().includes(search.toLowerCase()),
          )
        : parsedCompletedTodos
      const tagFilteredTodos = searchedTodos.filter((todo: Todo) => {
        if (!tags || tags.length === 0) return true
        return todo.tags && todo.tags.some((tag) => tags.includes(tag))
      })

      return tagFilteredTodos
    },
  })
}

export const useGetTodoTags = () => {
  return useQuery({
    queryKey: ['todoTags'],
    queryFn: () => {
      const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
      const completedTodos = localStorage.getItem(
        COMPLETE_TODOS_LOCAL_STORAGE_KEY,
      )
      const allTodos = [
        ...(todos ? JSON.parse(todos) : []),
        ...(completedTodos ? JSON.parse(completedTodos) : []),
      ]
      const tags = new Set<string>()
      const counts = new Map<string, number>()

      allTodos.forEach((todo: Todo) => {
        if (todo.tags) {
          todo.tags.forEach((tag: string) => {
            tags.add(tag)
            counts.set(tag, (counts.get(tag) || 0) + 1)
          })
        }
      })

      const tagsArray = Array.from(tags)
      const countSortedTags = tagsArray.sort((a, b) => {
        return (counts.get(b) || 0) - (counts.get(a) || 0)
      })

      return {
        tags: countSortedTags,
        counts: Object.fromEntries(counts),
      }
    },
  })
}
