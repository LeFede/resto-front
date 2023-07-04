import { Outlet } from "react-router-dom"
import data from "@/assets/Manus.json"
import { getActivities } from "../../redux/restoSlice"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Card from "@/components/Cards"

export const Main = () => {

  const dispatch = useDispatch()

  const datas = data


  //tobias
  useEffect(() => {
    const getMenus = () => {
      try {
        const menus: Array<string | object> = datas.map(data => data);
        dispatch(getActivities(menus));
      } catch (error) {
        console.log("Error en los Menus");
        throw error;
      }
    };

    getMenus();
  }, []);


  return (
    <>
      <Card />
      <Outlet />
    </>
  )
}
