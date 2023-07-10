import styles from "./Dishes.module.css"
import { Dish } from "@/components"

// TODO change type && separate code
export const Dishes = ({ menu }: any) => {

  if (!Object.entries(menu).length) return (
    <div className={styles.dishes}>
      <h1>No hay nada xd</h1>
    </div>
  )


  return (      
    <div className={styles.dishes}>
    {
      Object.entries(menu).map(([key, value]: [key: string, value: any]) => {
        return (
          <ul key={key}>
            <h4>{key}</h4>
            { 
              value
                .map((dish: any) => <Dish key={dish.title} dish={dish}/>) 
            }
          </ul>
        )
      })
    }
    </div>
  )
}


