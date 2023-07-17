import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import styles from "./Nav.module.css";
import { homeSvg, filtersSvg, cartSvg, reload, check } from "@/assets";
import { State } from "@/types";
import {
  setLessThanPriceFilter,
  setMoreThanPriceFilter,
  setLessThanReviewFilter,
  setMoreThanReviewFilter,
  setSearchFilter,
  setCategoryFilter,
} from "@/redux";

const initial = {
  lessThanPriceFilter: Infinity,
  moreThanPriceFilter: 0,
  lessThanReviewFilter: 5,
  moreThanReviewFilter: 0,
  searchFilter: "",
  categoryFilter: "",
};

export const Nav = () => {
  const navigate = useNavigate();
  const {
    currentTable,
    lessThanPriceFilter,
    moreThanPriceFilter,
    lessThanReviewFilter,
    moreThanReviewFilter,
    searchFilter,
    categoryFilter,
  } = useSelector((state: State) => state);

  const [form, setForm] = useState({
    lessThanPriceFilter,
    moreThanPriceFilter,
    lessThanReviewFilter,
    moreThanReviewFilter,
    searchFilter,
    categoryFilter,
  });

  const [showBg, setShowBg] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useDispatch();

  const handleShowFilters = () => {
    setShowFilters((prev) => {
      setShowBg(!prev);
      return !prev;
    });
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
    setShowBg(false);

    applyFilters();
  };

  const applyFilters = () => {
    // @ts-ignore
    dispatch(setLessThanPriceFilter(+form.lessThanPriceFilter));
    // @ts-ignore
    dispatch(setMoreThanPriceFilter(+form.moreThanPriceFilter));
    // @ts-ignore
    dispatch(setLessThanReviewFilter(+form.lessThanReviewFilter));
    // @ts-ignore
    dispatch(setMoreThanReviewFilter(+form.moreThanReviewFilter));
    // @ts-ignore
    dispatch(setSearchFilter(form.searchFilter));
    // @ts-ignore
    dispatch(setCategoryFilter(form.categoryFilter));
  };

  const setFilters = (event: any) => {
    const { name, value } = event.target;

    setForm((prev) => {
      const newForm = {
        ...prev,
        [name]: value,
      };
      return newForm;
    });
  };

  const onBlur = (event: any) => {
    const { name, value } = event.target;

    setForm((prev) => {
      const newForm = {
        ...prev,
        // @ts-ignore
        [name]: validValue[name](value),
      };
      return newForm;
    });
  };

  const validValue = {
    lessThanPriceFilter: (value: number) => {
      // console.log(value, form.moreThanPriceFilter)
      if (value < 0) return ''
      if (value < +form.moreThanPriceFilter) {
        // alert("El tope maximo no puede ser menor que el minimo")
        return form.moreThanPriceFilter;
      }
      return value;
    },
    moreThanPriceFilter: (value: number) => {
      if (value < 0) return ''
      if (value > +form.lessThanPriceFilter) {
        // alert("El tope minimo no puede ser menor que e  maximo")
        return form.lessThanPriceFilter;
      }
      return value;
    },
    lessThanReviewFilter: (value: number) => {
      if (value < 0) return 0;
      if (value > 5) return 5;
      if (value < form.moreThanReviewFilter) return form.moreThanReviewFilter;
      return value;
    },
    moreThanReviewFilter: (value: number) => {
      if (value < 0) return 0;
      if (value > 5) return 5;
      if (value > form.lessThanReviewFilter) return form.lessThanReviewFilter;
      return value;
    },

    searchFilter: (value: string) => value,
    categoryFilter: (value: string) => value,
  };

  const resetFilter = () => {
    setForm(initial);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const goHome = () => navigate('/')
  const goCart = () => navigate(`/table/${currentTable}/cart`)

  return (
    <nav className={styles.nav}>
      <ul className={styles.bar}>
        <li onClick={goHome}>
          <img className={styles.logosNav} src={homeSvg} alt="Home" />
        </li>
        <li onClick={handleShowFilters}>
          <img className={styles.logosNav} src={filtersSvg} alt="Filter" />
        </li>
        {currentTable && (
          <li>
            <img
              onClick={goCart}
              className={styles.logosNav}
              src={cartSvg}
              alt="Carrito"
            />
          </li>
        )}
      </ul>

      <form
        className={`${styles.filters} ${showFilters ? styles.showFilters : ""}`}
        onSubmit={handleSubmit}
      >
        <h3 className={styles.titlefilter}>Busqueda y filtros</h3>
        <fieldset>
          <h6>Buscar por nombre</h6>
          <input
          className={styles.inputs}
            type="text"
            id="searchFilter"
            name="searchFilter"
            onBlur={onBlur}
            onChange={setFilters}
            value={form.searchFilter}
          />
          <h6>Buscar por categoria</h6>
          <input
          className={styles.inputs}
            type="text"
            id="categoryFilter"
            name="categoryFilter"
            onBlur={onBlur}
            onChange={setFilters}
            value={form.categoryFilter}
          />
        </fieldset>

        <fieldset>
          <h6>Filtrar por precio</h6>

          <label htmlFor="lessThanPriceFilter">Precio máximo:</label>
          <input
          
            type="range"
            id="lessThanPriceFilter"
            name="lessThanPriceFilter"
            min="0"
            max="10000"
            step="1"
            value={form.lessThanPriceFilter}
            onChange={setFilters}
          />
          <span className={styles.num}>{form.lessThanPriceFilter}</span>
          <br />
          <label htmlFor="moreThanPriceFilter">Precio mínimo:</label>
          <input
            type="range"
            id="moreThanPriceFilter"
            name="moreThanPriceFilter"
            min="0"
            max="10000"
            step="1"
            value={form.moreThanPriceFilter}
            onChange={setFilters}
          />
          <span className={styles.num}>{form.moreThanPriceFilter}</span>
        </fieldset>


       <fieldset className={styles.filtercontainer} >
          <h6>Reviews</h6>

          <label htmlFor="review-gt">Min </label>
          <input
            type="number"
            id="review-gt"
            name="moreThanReviewFilter"
            onBlur={onBlur}
            onChange={setFilters}
            value={form.moreThanReviewFilter}
          />
          <br />
          <label htmlFor="review-lt"> Max</label>
          <input
            type="number"
            id="review-lt"
            name="lessThanReviewFilter"
            onBlur={onBlur}
            onChange={setFilters}
            value={form.lessThanReviewFilter}
          />
        </fieldset>


        <div className={styles.containerbutton}>
          <button className={styles.button} onClick={resetFilter}>
            <img src={reload} alt="" />
          </button>
          <button className={styles.button} onClick={handleCloseFilters}>
            <img src={check} alt="" />
          </button>
        </div>
      </form>

      <div
        className={`${styles.background} ${showBg ? styles.fadein : ""}`}
      ></div>
    </nav>
  );
};
