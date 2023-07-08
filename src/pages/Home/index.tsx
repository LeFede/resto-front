import styles from "./Home.module.css"
import { millLogo } from "@/assets"
import { Button } from "@/components"
import { useNavigate } from "react-router-dom"

export const Home = () => {

  const navigate = useNavigate()

  return (
    <section className={styles.home}>
      <div className={styles.titleContainer}>
        <h1>El</h1><img src={millLogo}/><h1>molino</h1>
      </div>
      <Button action={() => navigate("/menu")}>Ver menus</Button>
    </section>
  )
}
