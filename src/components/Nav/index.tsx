import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

import styles from "./Nav.module.css"
import { Button } from "@/components"
import { homeSvg, filtersSvg, cartSvg } from "@/assets"
import { State } from "@/types"
import { 
  setLessThanPriceFilter, 
  setMoreThanPriceFilter, 
  setLessThanReviewFilter, 
  setMoreThanReviewFilter,
  setSearchFilter,
  setCategoryFilter,
} from "@/redux"

const initial = {
  lessThanPriceFilter : 10000,
  moreThanPriceFilter : 0,
  lessThanReviewFilter : 5,
  moreThanReviewFilter : 0,
  searchFilter : "",
  categoryFilter: "",
}


export const Nav = () => {

  const navigate = useNavigate()
  const { 
    currentTable, 
    lessThanPriceFilter, 
    moreThanPriceFilter, 
    lessThanReviewFilter, 
    moreThanReviewFilter,
    searchFilter,
    categoryFilter,
  } = useSelector((state: State) => state)

  const [form, setForm] = useState({
    lessThanPriceFilter, moreThanPriceFilter,
    lessThanReviewFilter, moreThanReviewFilter,
    searchFilter, categoryFilter
  })

  const [showBg, setShowBg] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

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

    applyFilters()
  }

  const applyFilters = () => {
    // @ts-ignore
    dispatch(setLessThanPriceFilter(+form.lessThanPriceFilter))
    // @ts-ignore
    dispatch(setMoreThanPriceFilter(+form.moreThanPriceFilter))
    // @ts-ignore
    dispatch(setLessThanReviewFilter(+form.lessThanReviewFilter))
    // @ts-ignore
    dispatch(setMoreThanReviewFilter(+form.moreThanReviewFilter))
    // @ts-ignore
    dispatch(setSearchFilter(form.searchFilter))
    // @ts-ignore
    dispatch(setCategoryFilter(form.categoryFilter))
  }

  const setFilters = (event: any) => {
    const { name, value } = event.target


    setForm(prev => {
      const newForm = {
        ...prev,
        [name]: value
      }
      return newForm
    })
  }

  const onBlur = (event: any) => {
    const { name, value } = event.target

    setForm(prev => {
      const newForm = {
        ...prev,
        // @ts-ignore
        [name]: validValue[name](value)
      }
      return newForm
    })
  }

  const validValue = {
    lessThanPriceFilter: (value: number) => {
      if (value < 0) return ''
      if (value < form.moreThanPriceFilter) {
        // alert("El tope maximo no puede ser menor que el minimo")
        return form.moreThanPriceFilter
      }
      return value
    },
    moreThanPriceFilter: (value: number) => {
      if (value < 0) return ''
      if (value > form.lessThanPriceFilter) {
        // alert("El tope minimo no puede ser menor que el maximo")
        return form.lessThanPriceFilter
      }
      return value
    },
    lessThanReviewFilter: (value: number) => {
      if (value < 0) return 0
      if (value > 5) return 5
      if (value < form.moreThanReviewFilter) return form.moreThanReviewFilter
      return value
    },
    moreThanReviewFilter: (value: number) => {
      if (value < 0) return 0
      if (value > 5) return 5
      if (value > form.lessThanReviewFilter) return form.lessThanReviewFilter
      return value
    },

    searchFilter: (value: string) => value,
    categoryFilter: (value: string) => value,
  }
  

  const resetFilter = () => {
    setForm(initial)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // handleCloseFilters()
  }

  const goHome = () => navigate('/')
  const goCart = () => navigate('table/cart/:tableId')

  return (
    <nav className={styles.nav}>

      <ul className={styles.bar}>
        <li onClick={goHome}><img className={styles.logosNav} src={homeSvg} alt="Home" /></li>
        <li onClick={handleShowFilters}><img className={styles.logosNav} src={filtersSvg} alt="Filter" /></li>
        {currentTable && <li onClick={goCart}><img className={styles.logosNav} src={cartSvg} alt="Carrito" /></li>}
      </ul>

      <form
        className={`${styles.filters} ${showFilters ? styles.showFilters : ""}`}
        onSubmit={handleSubmit}
      >
        <h3>Busqueda y filtros</h3>

        <fieldset>
          <h6>Precio</h6>

          <label htmlFor="price-gt">Entre </label>
          <input className={styles.priceTag} id="price-gt" type="number" name='moreThanPriceFilter' onBlur={onBlur} onChange={setFilters} value={form.moreThanPriceFilter}/>
          
          <label htmlFor="price-lt"> y </label>
          <input className={styles.priceTag} id="price-lt" type="number" name='lessThanPriceFilter' onBlur={onBlur} onChange={setFilters} value={form.lessThanPriceFilter}/>

        </fieldset>

        <fieldset>
          <h6>Reviews</h6>

          <label htmlFor="review-gt">Entre </label>
          <input className={styles.priceTag} type="number" id="review-gt" name="moreThanReviewFilter" onBlur={onBlur} onChange={setFilters} value={form.moreThanReviewFilter}/>

          <label htmlFor="review-lt"> y </label>
          <input className={styles.priceTag} type="number" id="review-lt" name="lessThanReviewFilter" onBlur={onBlur} onChange={setFilters} value={form.lessThanReviewFilter}/>
          
        </fieldset>

        <fieldset>
          <h6>Buscar</h6>
          <input className={styles.priceTag} type="text" id="searchFilter" name="searchFilter" onBlur={onBlur} onChange={setFilters} value={form.searchFilter}/>
          <input className={styles.priceTag} type="text" id="categoryFilter" name="categoryFilter" onBlur={onBlur} onChange={setFilters} value={form.categoryFilter}/>
        </fieldset>


        <Button action={resetFilter}>Limpiar filtros</Button>
        <Button action={handleCloseFilters}>Aplicar filtros y cerrar</Button>
      </form>

      <div className={`${styles.background} ${showBg ? styles.fadein : ""}`}>
      </div>

    </nav>
  )
}
