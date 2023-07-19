import { DishForm } from "@/components/FormDish";
import { Table } from "@/components/FormTable";
import { Main } from "@/layouts";

import { Home, Login, Menu, NotFound, Dashboard, MenuDetail, Cart , PanelAdmin, Rating, EditDish} from "@/pages";

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
        path: "table/:tableId",
        element: <Menu />,
        children: [
          {
            path: "cart",
            element: <Cart />
          },
          {
            path: ":menuId",
            element: <MenuDetail />
          }
        ]
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // {
      //   path: "table/cart/:tableId",
      //   element: <Cart/>,
      // },
      {
        path: "/table",
        element: <Table/>,
      },
      {
        path: "/dish",
        element:<DishForm/>
      },
      {
        path: "/admin",
        element:<PanelAdmin/>,
        children: [
          {
            path: "/dishId",
            element: <EditDish />
          }
        ]
      },
      
      {
        path: "/rating",
        element:<Rating/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }
])
