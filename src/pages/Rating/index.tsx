import { useEffect, useState } from "react";
import styles from "./Rating.module.css";
import { useLocation } from "react-router-dom";


export const Rating = () => {
  const [order, setOrder] = useState<any | null>(null);
  const currentUrl = useLocation();
  const params = new URLSearchParams(currentUrl.search);
  const id: string | null = params.get("orderId");

  const fetchOrder = async (id: string | null) => {
    if (!id) {
      return;
    }
    const response = await fetch(
      `http://resto-back-production-2867.up.railway.app/order/${id}`
    );
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    fetchOrder(id).then((data) => setOrder(data));
  }, []);
  const updateDishReviews = async (dishId: string, newReview: number) => {
    try {
      console.log(dishId);
      const indexOfDish = order.item.findIndex((x:any)=>{
        return x.dish._id === dishId;
      })
      order.item[indexOfDish].dish.reviews.push(newReview)
      const requestOption =  
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              "reviews": order.item[indexOfDish].dish.reviews
            }
          ),
        }
      const response = await fetch(
        `http://resto-back-production-2867.up.railway.app/dish/${dishId}`,
        requestOption
      );
      if (response.ok) {
        console.log("a");
        
      } else {
        console.log("entro");
      }
    } catch (error) {
      console.log("entro1");
      console.log(error);
    }
  };
  if (order === null) {
    return <h1>Loading...</h1>;
  }
  return (
    <section className={styles.container}>
      <h2>pedido de la mesa {order.table}</h2>
      <h6>precio total = {order.totalPrice}</h6>
      <section className={styles.dishes}>
        {order.item.map((x: any) => {
          const reviews = x.dish.reviews;
          const sum = reviews.reduce((acc: number, review: number) => acc + review, 0);
          const average = Math.round((sum / reviews.length)*100 )/100 ;

          return (
            <div className={styles.dish}>
              {x.dish.title}
              {x.dish.price}
              <p>Average Rating: {average}</p>
              <img src={x.dish.image} alt="" />
              <section>
                <button onClick={() => updateDishReviews(x.dish._id, 1)}>1</button>
                <button onClick={() => updateDishReviews(x.dish._id, 2)}>2</button>
                <button onClick={() => updateDishReviews(x.dish._id, 3)}>3</button>
                <button onClick={() => updateDishReviews(x.dish._id, 4)}>4</button>
                <button onClick={() => updateDishReviews(x.dish._id, 5)}>5</button>
              </section>
            </div>
          );
        })}
      </section>
    </section>
  );
};