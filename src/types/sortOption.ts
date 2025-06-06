export type SortOption = {
  value: 'priority' | 'assignee' | 'deadline' | 'none'
  label: string
}

export const sortOptions: SortOption[] = [
  { value: 'none', label: 'None' },
  { value: 'priority', label: 'Priority' },
  { value: 'assignee', label: 'Assignee' },
  { value: 'deadline', label: 'Deadline' },
]
