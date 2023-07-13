import { IMenu } from "@/types";
import { useSelector } from "react-redux";
import styles from "./cart.module.css"
import DeleteSvg from "@/assets/delete.svg"
export const Cart = () => {
    const { cart } = useSelector((state: IMenu | any) => state);

    if(!cart){
        return(
            <div> cargando </div>
        )
    }

    return (
        <>
        <h2 className={styles.title}>Pedido</h2>
        <div className={styles.container}>
        
            {cart.map((ord: IMenu | any) => {
                return (

                    <div className={styles.dish}>
                        <div>
                            <h5>{ord.title}</h5>
                            <br />
                            <p>{ord.ingredients}</p>
                            <button className={styles.containerBoton}>
                             ➖
                            </button>
                            <p>{ord.price}$</p>
                        </div>
                        <br />
                    </div>
                )
            })}
        </div>
        </>
    );
}
