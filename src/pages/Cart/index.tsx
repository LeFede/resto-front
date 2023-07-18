// import { IMenu } from "@/types";
// import DeleteSvg from "@/assets/delete.svg"
import { useSelector } from "react-redux"
import styles from "./cart.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const sv = "http://resto-back-production-2867.up.railway.app/mpcreate-order"

export const Cart = () => {
  const { cart, currentTable } = useSelector((state: any) => state)
  const navigate = useNavigate()

  const createPreference = async () => {
    try {
      const response = await axios.post(sv, {
        // @ts-ignore
        item: cart.map(i => ({
          dish: i.dish,
          quantity: i.quantity,
          totalPrice: i.totalPrice,
          observation: i.observation
        })),
        table: currentTable,
        // @ts-ignore
        totalPrice: cart.reduce((acc, curr) => acc + (curr.totalPrice * curr.quantity), 0),
      }, 
      {
        headers: {
          Accept: "*/*",
        }
      })

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuy = async () => {
    const link = await createPreference()
    window.location.replace(link)
  }

  return (
    <section className={styles.cart}>
      <div className={styles.container}>
      <h2 className={styles.title}>Pedido</h2>
        {
          /* @ts-ignore */
          cart.map(item => <h6 key={item.dish}>{item.title} x {item.quantity}</h6>)
        }
        
        {/* @ts-ignore */}
        <h2>TOTAL: {cart.reduce((acc, curr) => acc + (curr.totalPrice * curr.quantity), 0)}</h2>
        {
          cart.length ? <button onClick={handleBuy}>Pagar</button> : ''
        }
        
      <button onClick={() => navigate(-1)}>Cerrar</button>


        {/* {cart.map((ord: IMenu | any) => {
							return (

									<div className={styles.dish}>
											<div>
													<h5>{ord.title}</h5>
													<br />
													<p>{ord.ingredients.join(', ')}</p>
													<button className={styles.containerBoton}>
															<img className={styles.logoDelete} src={DeleteSvg} alt="Filter" />
													</button>
													<p>{ord.price}$</p>
											</div>
											<br />
									</div>
							)
					})} */}
      </div>
    </section>
  )
}


