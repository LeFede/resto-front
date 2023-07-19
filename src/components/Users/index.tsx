


import {  UserCardProps } from '@/types';
import styles from './User.module.css';
import { Link } from 'react-router-dom';



const UserCard = ({ user, onDelete }: UserCardProps) => {
  return (
    <div className={styles.cardShow}>
      <p>Name: {user.name}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>

      <button onClick={onDelete}>Eliminar</button>

      <Link to={`/editlist/${user.id}`}>
        <button>Editar</button>
      </Link>
    </div>
  );
};

export default UserCard;
