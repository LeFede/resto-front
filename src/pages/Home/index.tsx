import { react } from "@/assets"
import data from "@/assets/Manus.json"
import { getMenus } from "@/redux/restoSlice"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Cards } from "@/components"


export const Home = () => {

  const dispatch = useDispatch()
  const datas = data
  useEffect(() => {
    const fetchMenus = () => {
      try {
        const menus: Array<string | object> = datas.map(data => data);
        dispatch(getMenus(menus));
      } catch (error) {
        console.log("Error en los Menus");
        throw error;
      }
    };

    fetchMenus();
  }, []);

  return (
    <div>
      <Cards/>
      <h1>Home h1</h1>
      <h2>Home hsdgasdfhdfghdfgk2</h2>
      <h3>Home sdfghsdwfghdfgjh3</h3>
      <h4>Home </h4>
      <h5>Home h5</h5>
      <h6>Home h6</h6>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <small>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</small>
      <img src={react} />
    </div>
  )
}
