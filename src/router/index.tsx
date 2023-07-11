import { Main } from "@/layouts";
import { Home, Login, Menu, NotFound, Dashboard, Cart } from "@/pages";
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
      },
      {
        path: "table/cart/:tableId",
        element: <Cart/>,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }
])
