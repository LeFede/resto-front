import styles from "./Dish.module.css"
import { IProcessedMenu, State } from "@/types"
import { calculateMedium } from "@/utils"
import AgregarSvg from "@/assets/agregar.svg"
import { useDispatch, useSelector } from "react-redux"
import { agregarPlato } from "@/redux"

export const Dish = ({ dish }: IProcessedMenu) => {

  const medium = dish.reviews.reduce(calculateMedium, 0)
  const stars = Array.from({ length: medium }).map((_, i) => <span key={i}>⭐</span>)
  const dispatch = useDispatch();
  const { currentTable } = useSelector((state: State) => state)

  return ( 
    <li className={styles.dish}>
      <div>
        <h6>{dish.title}</h6>
        <small>{stars}</small>
        <p>{dish.ingredients.join(', ')}</p>
      </div>
      <h6>${dish.price}</h6>
      {
        currentTable && <button className={styles.containerBoton} onClick={() => dispatch(agregarPlato(dish))}>
        <img className={styles.logo} src={AgregarSvg} alt="agregar" />
      </button>
      }

      


      
      
    </li>
  )
}

