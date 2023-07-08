import { Outlet, useParams } from "react-router-dom"
import { Nav } from "@/components"
import { setTable, fetchMenus } from "@/redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

export const Main = () => {
  const dispatch = useDispatch()
  const { tableId } = useParams()

  useEffect(() => {
    dispatch<any>(fetchMenus())
    if (!tableId) return
    console.log(`TABLE: ${tableId}`)
    dispatch(setTable(tableId))
  }, [])

  return (
    <>
      <main>
        <Outlet/>
      </main>
      <Nav />
    </>
  )
}
