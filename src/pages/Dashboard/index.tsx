import { Order, State } from "@/types";
import styles from "./Dashboard.module.css"
import { useSelector } from "react-redux";
import DeleteSvg from "@/assets/delete.svg"

export const Dashboard = () => {
  const { orders } = useSelector((state: State) => state);



  return (
    <section className={styles.dashboard}>
      {orders.map((orders: Order) => {
        return (

          <div>

            <h3 className={styles.table}>Mesa {orders.id} 
            <button className={styles.blogoDelete}>
            <img className={styles.logoDelete} src={DeleteSvg} alt="Filter" />
            </button>
            </h3>
            {orders.items.map((ord) => {
              return (

                <div className={styles.order}>
                  <div>
                    <h5>{ord.title}</h5>
                    <br />
                    <p>{ord.ingredients.join(', ')}</p>
                  </div>
                  <br />
                </div>
              )
            })}
          </div>
        )
      })}
    </section>
  )
}