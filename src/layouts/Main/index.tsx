import { Outlet } from "react-router-dom"
import { Nav, Footer } from "@/components"

export const Main = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </>
  )
}
