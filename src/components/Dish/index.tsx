import styles from "./Dish.module.css"
import { IProcessedMenu } from "@/types"
import { calculateMedium } from "@/utils"

export const Dish = ({ dish }: IProcessedMenu) => {

  const medium = dish.reviews.reduce(calculateMedium, 0)
  const stars = Array.from({ length: medium }).map((_, i) => <span key={i}>⭐</span>)

  return ( 
    <li className={styles.dish}>
      <div>
        <h6>{dish.title}</h6>
        <small>{stars}</small>
        <p>{dish.ingredients.join(', ')}</p>
      </div>
      <h6>${dish.price}</h6>
    </li>
  )
}

