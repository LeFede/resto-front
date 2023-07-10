import { Main } from "@/layouts";
import { Home, Login, Menu, NotFound, Dashboard } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "menu",
        element: <Menu />
      },
      {
        path: "table/:tableId",
        element: <Menu />
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }
])
