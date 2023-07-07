import { Link } from "react-router-dom"
import styles from "./nav.module.css"
import { useState } from "react"

export const Nav = () => {
  
  const [mostrar, setMostrar] = useState(false)

  const handleClick = () => {

    setMostrar(!mostrar)
  }

  return (

    <div>

      <section className={`${styles.filterBar} ${mostrar ? styles.filterBarMostrar : ""}`}>
       
        <select className={styles.filterBar__opciones} name="precio">

          <option value="#">PRECIO</option>
          <option value="mayor">MAYOR</option>
          <option value="menor">MENOR</option>

        </select>

        <select className={styles.filterBar__opciones} name="tipo">

          <option value="">TIPOS</option>
          <option value="desayuno">DESAYUNO</option>
          <option value="almuerzo">ALMUERZO</option>
          <option value="cena">CENA</option>

        </select>

        <button className={styles.filterBar__opciones} name="ofertas">OFERTAS</button>

      </section>

      <nav className={styles.navBar}>

        <ul>

          <li><Link to="#"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#C5B490" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg></Link></li>
          <li><button onClick={handleClick}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-big-down-lines" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#C5B490" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 12h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-3h6v3z" /><path d="M15 3h-6" /><path d="M15 6h-6" /></svg></button></li>
          <li><Link to="#"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#C5B490" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg></Link></li>

        </ul>

      </nav>
    
    </div>

  )
}


