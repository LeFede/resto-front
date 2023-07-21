import React, { useState, useEffect } from 'react';
import styles from './Edit.module.css';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import app from '../../firebase.config';
import { User } from '@/types';

const firestore = getFirestore(app);


  
  export const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User | undefined>(undefined);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          if (id) {
            const userRef = doc(firestore, 'users', id);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
              const userFromSnapshot: User = {
                ...userSnapshot.data() as User,
                id: userSnapshot.id,
              };
              setUser(userFromSnapshot);
            } else {
              console.log('El usuario no existe');
            }
          }
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      };
      fetchUser();
    }, [id]);
  
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            [name]: name === 'active' ? value === 'true' : value,
          };
        }
        return prevUser;
      });
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        if (user && user.id) {
          const userRef = doc(firestore, 'users', user.id);
          await updateDoc(userRef, {
            ...user,
          });
          console.log('Usuario actualizado con ID:', user.id);
        }
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    };
  
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
  
  return (
    <div>
      <h2>Edit User</h2>
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <input
          id='nameId'
          name="name"
          placeholder="Nombre de Usuario"
          className={styles.messageInput}
          value={user.name}
          onChange={handleOnChange}
          required
        />
        <input
          id='lastNameId'
          name="lastName"
          placeholder="Apellido"
          className={styles.messageInput}
          type="text"
          value={user.lastName}
          onChange={handleOnChange}
          required
        />
        <input
          id='emailId'
          name="email"
          type='email'
          placeholder="Email"
          className={styles.messageInput}
          value={user.email}
          onChange={handleOnChange}
          required
        />

        <select id='roleId' name="role" className={styles.messageInput} value={user.role} onChange={handleOnChange} required>
          <option value="">Roles</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        <select name="active" id="activeId" className={styles.messageInput} value={user.active ? 'true' : 'false'} onChange={handleOnChange}>
          <option value="true">Activo</option>
          <option value="false">Desactivado</option>
        </select>

        <input
          id='passwordId'
          name="password"
          type='password'
          placeholder="Ingrese Contraseña"
          className={styles.messageInput}
          value={user.password}
          onChange={handleOnChange}
          required
        ></input>

        <button name="submit" className={styles.btn} type="submit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};
