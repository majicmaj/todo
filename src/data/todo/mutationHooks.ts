import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  TODOS_LOCAL_STORAGE_KEY,
  COMPLETE_TODOS_LOCAL_STORAGE_KEY,
} from './constants'
import {
  postTodo,
  moveTodoToCompleted,
  moveTodoToIncomplete,
  deleteTodo,
  deleteCompletedTodo,
  updateTodo,
} from './mutations'

export const usePostTodo = () => {
  return useMutation({
    mutationFn: postTodo,
  })
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

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TODOS_LOCAL_STORAGE_KEY],
      })
    },
  })
}

export const useDeleteCompletedTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCompletedTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COMPLETE_TODOS_LOCAL_STORAGE_KEY],
      })
    },
  })
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TODOS_LOCAL_STORAGE_KEY],
      })
    },
  })
}
