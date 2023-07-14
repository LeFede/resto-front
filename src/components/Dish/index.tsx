import styles from "./Dish.module.css"
import { IProcessedMenu, State } from "@/types"
import { calculateMedium } from "@/utils"

import { useDispatch, useSelector } from "react-redux"
import { agregarPlato } from "@/redux"
import { useNavigate } from "react-router-dom"

export const Dish = ({ dish }: IProcessedMenu) => {

  const navigate = useNavigate()
  
  const medium = dish.reviews.reduce(calculateMedium, 0)
  const stars = Array.from({ length: medium }).map((_, i) => <span key={i}>⭐</span>)
  const dispatch = useDispatch();
  const { currentTable } = useSelector((state: State) => state)

  const handleClick = (e: any) => {
    if (e.target.tagName === "BUTTON") return
    navigate(`/menu/${dish._id}`)
  }

  return ( 
    <li className={styles.dish} onClick={handleClick}>
      <div className={styles.left}>
        <h6>{dish.title}</h6>
        <small>{stars}</small>
        <p>{dish.description}</p>
      </div>
      <div className={styles.right}>
        <h6>${dish.price}</h6>
        {
          currentTable && (
            <div className={styles.buttons}>
              <button 
                className={`${styles.containerBoton} ${styles.buttonLeft}`} 
                onClick={() => dispatch(agregarPlato(dish))}
              >+
              </button>
              <button 
                className={`${styles.containerBoton} ${styles.buttonRight}`} 
                onClick={() => dispatch(agregarPlato(dish))}
              >-
              </button>
            </div>
          ) 
        }
      </div>
      
    </li>
  )
}

          // <img className={styles.logo} src={AgregarSvg} alt="agregar" />
