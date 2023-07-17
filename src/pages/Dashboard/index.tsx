import styles from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { WithoutPermissions } from "@/pages/WithoutPermissions";
import { fetchOrders } from "../../redux/index";
import {  cargando, checkB, entregado } from "@/assets";

export const Dashboard = () => {
  const { orders, userRol } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchOrders());
  }, [dispatch]);

  const deleteOrder = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/order/delete/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrderState = async (id: string, newState: string) => {
    try {
      const response = await fetch(`http://localhost:3000/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ state: newState }),
      });

      if (response.ok) {
        console.log("Estado de la orden actualizado correctamente");
      } else {
        console.error("Error al actualizar el estado de la orden");
      }
    } catch (error) {
      console.error("Error en la solicitud PUT:", error);
    }
  };

  if (userRol !== "admin") {
    return <WithoutPermissions />;
  }

  const activeOrders = orders.filter((order: any) => order.active);

  return (
    <section className={styles.fakeback}>
      <h2 className={styles.title}>Ordenes</h2>
      <div className={styles.dashboard}>
      
      {activeOrders.map((order: any) => (
        <div className={styles.orden} key={order._id}>
          {/* <h1>{order._id}</h1> */}
          <h2>Table: {order.table}</h2>
          <h2>Status: {order.state}</h2>

          <div className={styles.containerbotones}>
          {order.state !== "delivered" && (
            <>
              <button className={styles.boton}
                onClick={() => updateOrderState(order._id, "in progress")}
              >
                <img className={styles.img} src={cargando} alt="" />
              </button>
              <button  className={styles.boton}
               onClick={() => updateOrderState(order._id, "ready")}>
                <img className={styles.img} src={checkB} alt="Listo" />
              </button>
              <button className={styles.boton}
              onClick={() => updateOrderState(order._id, "delivered")}>
                <img className={styles.img} src={entregado} alt="entregado" />
              </button>
            </>
          )}

          {order.state === "delivered" && (
            <button onClick={() => deleteOrder(order._id)}>BORRAR</button>
          )}

          </div>
          
          <ul>
            {order.item.map((item: any) => (
              <li className={styles.table} key={item.dish._id}>
                <h3>{item.dish.title}</h3>
                <p>Quantity: {item.quantity}</p>
                {item.observation && <p>Observation: {item.observation}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </section>
  );
};
