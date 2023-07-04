import { useSelector } from 'react-redux';

type Menu = {
  name: string;
  img: string;
  price: string;
  tipo: string;
  description: string;
};

export const Card = () => {
  const menus: Menu[] = useSelector((state: { menus: Menu[] }) => state.menus);
  console.log(Card);
  
  return (
    <>
      <div>
      {menus.map((menu, index) => (
        <div key={index}>
          <h2>{menu.name}</h2>
          <img src={menu.img} alt={menu.name} />
          <p>{menu.price}$</p>
          <p>{menu.tipo}</p>
          <p>{menu.description}</p>
        </div>
      ))}
      </div>
    </>
  );
};

