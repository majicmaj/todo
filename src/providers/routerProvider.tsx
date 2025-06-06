import App from '@/App'
import Create from '@/components/views/create/create'
import Edit from '@/components/views/edit/edit'
import Home from '@/components/views/home/home'
import SingleTodo from '@/components/views/todo/singleTodo'

import { createBrowserRouter, RouterProvider as Provider } from 'react-router'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/create',
        element: <Create />,
      },
      {
        path: '/edit/:id',
        element: <Edit />, // Reusing Create component for editing
      },
      {
        path: '/todo/:id',
        element: <SingleTodo />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

const RouterProvider = () => {
  return <Provider router={router} />
}

export { RouterProvider }
