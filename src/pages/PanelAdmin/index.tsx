import { IMenu, State } from "@/types";
import styles from "./PanelAdmin.module.css";

import { useSelector } from "react-redux";
import { on, off, pen, plato, lista, user, dahs, stats } from "@/assets";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import Swal from 'sweetalert2';

export const PanelAdmin = () => {
  const menus = useSelector((state: State) => state.menus);
  const handleClick = () => {
    Swal.fire({
      title: 'Bien',
      text: 'Su orden se actualizo',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };
  const [updatedPrice, setUpdatedPrice] = useState("");

  const [idToUpdate, setIdToUpdate] = useState("");

 
  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (/^([0-9]\d*)?$/.test(event.target.value)) {
      setUpdatedPrice(event.target.value);
    }
  };
  
  const handleEdit = (dishId: string) => {
    setIdToUpdate(dishId);
  };

  const handleToggle = async (dishId: string, isActive: boolean) => {
    const id = dishId;
    const isDishActive = isActive;
    const fetchToggle = async (dishId: string, isActive: boolean) => {
      if (dishId) {
        const requestOption = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: !isActive,
          }),
        };

        const response = await fetch(
          `http://resto-back-production-2867.up.railway.app/dish/toggle/${dishId}`,
          requestOption
        );
        const data = await response.json();
        return data;
      }
    };
    fetchToggle(id, isDishActive);
  };

  const [_, setShowBg] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const fetchPriceUpdate = async (dishId: string, newPrice: number) => {
    if (dishId && newPrice) {
      const requestOption = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: newPrice,
        }),
      };

      const response = await fetch(
        `http://resto-back-production-2867.up.railway.app/dish/${dishId}`,
        requestOption
      );
      const data = await response.json();
      return data;
    }
  };

  const handleShowFilters = () => {
    setShowFilters((prev) => {
      setShowBg(!prev);
      return !prev;
    });
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
    setShowBg(false);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <section>
      <nav className={styles.nav}>
        <Link to={"/user"}>
          <button className={styles.butt}>
            <img src={user} alt="user" className={styles.img} />
          </button>
        </Link>
        <Link to={"/list"}>
          <button className={styles.butt}>
            <img className={styles.img} src={lista} alt="lista" />
          </button>
        </Link>
        <Link to={"/dish"}>
          <button className={styles.butt}>
            <img className={styles.img} src={plato} alt="plato" />
          </button>
        </Link>
        <Link to={"/dashboard"}>
          <button className={styles.butt}>
            <img src={dahs} alt="dash" className={styles.img}/>
          </button>
        </Link>
        <Link to={"/chart"}>
          <button className={styles.butt}>
            <img src={stats} alt="stats" className={styles.img}/>
          </button>
        </Link>
        {/* <Link onClick={logoutUser} to={"/"}><button>LogOut</button></Link>  */}
      </nav>

      <section className={styles.container}>
        {menus.map((dish: IMenu) => {
          return (
            <div className={styles.dish}>
              <div className={styles.left}>
                <h6>{dish.title}</h6>
                
                <p>{dish.description}</p>
                <br />
              </div>

              <button
                onClick={() => handleEdit(dish._id.toString())}
                className={styles.edit}
              >
                <img src={pen} alt="edit" onClick={handleShowFilters} />
              </button>

              {dish.active ? (
                <button
                  onClick={() => {
                    handleToggle(dish._id.toString(), dish.active);
                    handleClick();
                  }}
                  className={styles.edit}
                >
                  <img src={on} alt="edit" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleToggle(dish._id.toString(), dish.active);
                    handleClick();
                  }}
                  className={styles.edit}
                >
                  <img src={off} alt="edit" />
                </button>
              )}

              <div className={styles.right}>
                <h6>${dish.price}</h6>
              </div>

              <form
                className={`${styles.filters} ${
                  showFilters ? styles.showFilters : ""
                }`}
                onSubmit={handleSubmit}
              >
                <div>
                  <br />
                  <label htmlFor="price"><h6>Precio:</h6> </label>
                  
                  <input
                    type="text"
                    name="updatePrice"
                    value={updatedPrice}
                    onChange={handleOnChange}
                  /> <br />
                  <button
                    onClick={() => fetchPriceUpdate(idToUpdate, +updatedPrice)}
                  >
                    actualizar precio
                  </button><br />
                  <button
                    className={styles.button}
                    onClick={() => {
                      handleCloseFilters();
                      handleClick();
                    }}
                  >
                    cerrar
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </section>
    </section>
  );
};
