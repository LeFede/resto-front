import { useState } from "react"
import styles from "./Nav.module.css"
import { Button } from "@/components"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import HomeSvg from "@/assets/home.svg"
import FilterSvg from "@/assets/filters.svg"
import CartSvg from "@/assets/cart.svg"
import { State } from "@/types"
import { setLessThanPriceFilter, setMoreThanPriceFilter } from "../../redux"

const initFilterState = {
    reviewFilter: 1,
    searchFilter: "",
    lessThanPriceFilter: Infinity,
    moreThanPriceFilter: 0,
    lessThanReviewFilter: 5,
    moreThanReviewFilter: 0,
  }

export const Nav = () => {

  const navigate = useNavigate()
  const { currentTable } = useSelector((state: State) => state)

  const [showBg, setShowBg] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const [isGreaterThanPriceFilter, setIsGraterThanPriceFilter] = useState(true)
  const [filters, setFilters] = useState(initFilterState)
  
  const dispatch = useDispatch();

  const handleShowFilters = () => {
    setShowFilters(prev => {
      setShowBg(!prev)
      return !prev
    })
  }

  const handleCloseFilters = () => {
    setShowFilters(false)
    setShowBg(false)

    setPriceFilter()
  }

  const setPriceFilter = () => {
    if (isGreaterThanPriceFilter) {
      dispatch(setMoreThanPriceFilter(filters.moreThanPriceFilter))
      dispatch(setLessThanPriceFilter(initFilterState.lessThanPriceFilter))
    } else {
      dispatch(setLessThanPriceFilter(filters.lessThanPriceFilter))
      dispatch(setMoreThanPriceFilter(initFilterState.moreThanPriceFilter))
    }
  }

  const resetFilter = () => {
    setFilters(initFilterState)
    dispatch(setLessThanPriceFilter(initFilterState.lessThanPriceFilter))
    dispatch(setMoreThanPriceFilter(initFilterState.moreThanPriceFilter))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  
  const handleFilterChange = (e: any) => {
    
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })

    isGreaterThanPriceFilter ? setFilters({...filters, moreThanPriceFilter: e.target.value}) : setFilters({...filters, lessThanPriceFilter: e.target.value})
  }

  const goHome = () => navigate('/')

  return (
    <nav className={styles.nav}>

      <ul className={styles.bar}>
        <li onClick={goHome}><img className={styles.logosNav} src={HomeSvg} alt="Home" /></li>
        <li onClick={handleShowFilters}><img className={styles.logosNav} src={FilterSvg} alt="Filter" /></li>
        {currentTable && <li ><img className={styles.logosNav} src={CartSvg} alt="Carrito" /></li>}
      </ul>

      <form
        className={`${styles.filters} ${showFilters ? styles.showFilters : ""}`}
        onSubmit={handleSubmit}
      >
        <h3>Busqueda y filtros</h3>

        <fieldset>
          <h6>Precio</h6>

          <label htmlFor="price-gt">Mayor que</label>
          <input id="price-gt" checked={isGreaterThanPriceFilter} type="radio" name="priceFilter" onChange={() => setIsGraterThanPriceFilter(!isGreaterThanPriceFilter)}/>
          <label htmlFor="price-lt">Menor que</label>
          <input id="price-lt" type="radio" checked={!isGreaterThanPriceFilter} name="priceFilter" onChange={() => setIsGraterThanPriceFilter(!isGreaterThanPriceFilter)}/>
          <input type="number" name='priceFilter' value={isGreaterThanPriceFilter ? filters.moreThanPriceFilter : filters.lessThanPriceFilter} onChange={handleFilterChange}/>

        </fieldset>

        <fieldset>
          <h6>Reviews</h6>

          <label htmlFor="review-gt">Mayor que</label>
          <input id="review-gt" checked type="radio" name="reviewFilter" />
          <label htmlFor="review-lt">Menor que</label>
          <input id="review-lt" type="radio" name="reviewFilter" />
          <input type="number" value={0}/>

        </fieldset>

        <fieldset>
          <h6>Buscar</h6>
          <input type="text" />
        </fieldset>


        <Button action={resetFilter}>Limpiar filtros</Button>
        <Button action={handleCloseFilters}>Cerrar</Button>
      </form>

      <div className={`${styles.background} ${showBg ? styles.fadein : ""}`}>
      </div>

    </nav>
  )
}
