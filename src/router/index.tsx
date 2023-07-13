import { DishForm } from "@/components/FormDish";
import { Table } from "@/components/FormTable";
import { Main } from "@/layouts";

import { Home, Login, Menu, NotFound, Dashboard, MenuDetail, Cart } from "@/pages";

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
        element: <Menu />,
        children: [
          {
            path: ":menuId",
            element: <MenuDetail />
          }
        ]
      },
      {
        path: "/table/:tableId",
        element: <Menu />
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      {
        path: "/table",
        element: <Table/>,
      },
      {
        path: "/dish",
        element:<DishForm/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }
])
