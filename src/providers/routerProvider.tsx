import App from '@/App'
import Create from '@/components/views/create/create'
import Home from '@/components/views/home/home'

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
    ],
  },
]

const router = createBrowserRouter(routes)

const RouterProvider = () => {
  return <Provider router={router} />
}

export { RouterProvider }
