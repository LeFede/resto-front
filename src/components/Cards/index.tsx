import { useSelector } from 'react-redux';
import styles from "./index.module.css"


type Menu = {
  name: string;
  img: string;
  price: string;
  tipo: string;
  description: string;
};

export const Cards = () => {
  const menus: Menu[] = useSelector((state: { menus: Menu[] }) => state.menus);


  return (
    <>
      <div className={styles['Container-Menus']}>
      {menus.map((menu, index) => (
        <div key={index}  className={styles['Menus']}>
          <h2>{menu.name}</h2>
          <img src={menu.img} className={styles.img} alt={menu.name} />
          <p>{menu.price}$</p>
          <p>{menu.tipo}</p>
          <p>{menu.description}</p>
        </div>
      ))}
      </div>
    </>
  );
};





