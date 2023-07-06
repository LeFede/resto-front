import { Main } from "@/layouts";
import { About, Home, LoginPage, NotFound, Orders } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/home",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "orders",
        element: <Orders />
      },
    ]
  }

  // {
  //   index: true,
  //   element: <Welcome />,
  //   errorElement: <NotFound />,
  // },
  // {
  //   path: "/videogames",
  //   element: <HomeLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Home />,
  //     },
  //     {
  //       path: ":id",
  //       element: <Single />
  //     },
  //     {
  //       path: "name",
  //       element: <Search />
  //     }
  //   ]
  // },
])
