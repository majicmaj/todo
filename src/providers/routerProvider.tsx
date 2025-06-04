import App from "@/App";
import { createBrowserRouter, RouterProvider as Provider } from "react-router";

const routes = [
  {
    path: "/",
    element: <App />,
  },
];

const router = createBrowserRouter(routes);

const RouterProvider = () => {
  return <Provider router={router} />;
};

export { RouterProvider };
