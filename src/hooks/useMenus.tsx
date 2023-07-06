import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchMenus } from "@/redux"

export const useMenus = () => {
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch<any>(fetchMenus())
   }, [])
}