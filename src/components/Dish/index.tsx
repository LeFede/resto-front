import styles from "./Dish.module.css"
import { IProcessedMenu, State } from "@/types"
import { calculateMedium } from "@/utils"
import AgregarSvg from "@/assets/agregar.svg"

import { useDispatch, useSelector } from "react-redux"
import { agregarPlato } from "@/redux"
import { useNavigate } from "react-router-dom"

export const Dish = ({ dish }: IProcessedMenu) => {

  const navigate = useNavigate()

  const medium = dish.reviews.reduce(calculateMedium, 0)
  const stars = Array.from({ length: medium }).map((_, i) => <span key={i}>⭐</span>)
  const dispatch = useDispatch();
  const { currentTable } = useSelector((state: State) => state)

  const handleClick = () => {
    navigate(`/menu/${dish._id}`)
  }

  return ( 
    <li className={styles.dish}>
      <div>
        <h6  onClick={handleClick}>{dish.title}</h6>
        <small>{stars}</small>
        <p>{dish.description}</p>
      </div>
      <h6>${dish.price}</h6>
      {
        currentTable && <button className={styles.containerBoton} onClick={() => dispatch(agregarPlato(dish))}>
        ➕
      </button>
      }
    </li>
  )
}

