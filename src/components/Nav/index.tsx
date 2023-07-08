import { useState } from "react"
import styles from "./Nav.module.css"
import { Button } from "@/components"
import { useNavigate } from "react-router-dom"

export const Nav = () => {

  const navigate = useNavigate()
  
  const [showBg, setShowBg] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  const handleShowFilters = () => {
    setShowFilters(prev => {
      setShowBg(!prev)
      return !prev
    })
  }

  const handleCloseFilters = () => {
    setShowFilters(false)
    setShowBg(false)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  const goHome = () => navigate('/')

  return (
    <nav className={styles.nav}>

      <ul className={styles.bar}>
        <li onClick={goHome}>HOME</li>
        <li onClick={handleShowFilters}>FILTROS</li>
        <li>CARRITO</li>
      </ul>

      <form 
        className={`${styles.filters} ${showFilters ? styles.showFilters : ""}`} 
        onSubmit={handleSubmit}
      >
        <h3>Busqueda y filtros</h3>

        <fieldset>
          <h6>Precio</h6>
          
          <label htmlFor="price-gt">Mayor que</label>
          <input id="price-gt" checked type="radio" name="priceFilter"/>
          <label htmlFor="price-lt">Menor que</label>
          <input id="price-lt" type="radio" name="priceFilter"/>
          <input type="number" value={0}/>

        </fieldset>

        <fieldset>
          <h6>Reviews</h6>
          
          <label htmlFor="review-gt">Mayor que</label>
          <input id="review-gt" checked type="radio" name="reviewFilter"/>
          <label htmlFor="review-lt">Menor que</label>
          <input id="review-lt" type="radio" name="reviewFilter"/>
          <input type="number" value={0}/>

        </fieldset>

        <fieldset>
          <h6>Buscar</h6>
          <input type="text"/>
        </fieldset>


        <Button action={handleCloseFilters}>Cerrar</Button>
      </form>

      <div className={`${styles.background} ${showBg ? styles.fadein : ""}`}>
      </div>

    </nav>
  )
}
