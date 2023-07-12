import { useEffect, useState } from "react"
import styles from "./Dishes.module.css"
import { Dish } from "@/components"

const elemsPerPage = 4
// TODO change type && separate code
export const Dishes = ({ menu }: any) => {

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const newTotalPages = Math.ceil(Object.entries(menu).length / elemsPerPage) - 1 
    setTotalPages(newTotalPages)
  }, [menu])

  if (!Object.entries(menu).length) return (
    <div className={styles.dishes}>
      <h1>No se encontraron menus que apliquen a los filtros especificados</h1>
    </div>
  )

  return (      
    <div className={styles.dishes}>
    {
      Object.entries(menu)
        .slice(page * elemsPerPage, elemsPerPage * (page + 1))
        .map(([key, value]: [key: string, value: any]) => {
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
      {
        totalPages > 1 && <div className={styles.pagination}>
          <button onClick={() => setPage(prev => {
            if (prev - 1 < 0) return prev
            return --prev
          })}>-</button>  
          <button>{page + 1}</button>
          <button onClick={() => setPage(prev => {
            if (prev + 1 > totalPages) return prev
            return ++prev
          })}>+</button>  
        </div>
      }
    </div>
  )
}


