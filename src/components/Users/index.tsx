

// import styles from './User.module.css';
// import { Link } from 'react-router-dom';

// interface User {
//   id: string;
//   name: string;
//   lastName: string;
//   email: string;
// }

// const UserCard = ({ user }: { user: User }) => {
//     return (
//         <div className={styles.cardShow}>
//           <p>Name: {user.name}</p>
//           <p>Last Name: {user.lastName}</p>
//           <p>Email: {user.email}</p>
    
//           <button>Eliminar</button>
    
//           <Link to={`/editlist/${user.id}`}>
//             <button>Editar</button>
//           </Link>
//         </div>
//       );
//     };

// export default UserCard;
import styles from './User.module.css';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  deleted: boolean;
}

interface UserCardProps {
  user: User;
  onDelete: () => Promise<void>;
}

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
