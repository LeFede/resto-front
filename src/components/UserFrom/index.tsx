import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './User.module.css'
import { TableUser } from '@/types';
import  app  from '../../firebase.config';

import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const firestore = getFirestore(app);


export const UserForm = () => {



    const initialData: TableUser = {
        name:'',
        lastName: '',
        email: '',
        password: '',
        role: '',
        active: false
      };
      const [dataForm, setDataForm] = useState<TableUser>(initialData);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const { name, value } = event.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(dataForm);
    try {
      const docRef = await addDoc(collection(firestore, 'users'), dataForm);
      console.log('Usuario creado con ID: ', docRef.id);
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };
  return (
 
        <form id='userForm' className={styles.formTable} onSubmit={handleSubmit}>
          <input
            id='nameId'
            name="name"
            placeholder="Nombre de Usuario"
            className={styles.messageInput}
            value={dataForm.name}
            onChange={handleOnChange}
            required
          />
          <input
            id='lastNameId'
            name="lastName"
            placeholder="Apellido"
            className={styles.messageInput}
            type="text"
            value={dataForm.lastName}
            onChange={handleOnChange}
            required
          />
          <input
            id='emailId'
            name="email"
            type='email'
            placeholder="Email"
            className={styles.messageInput}
            value={dataForm.email}
            onChange={handleOnChange}
            required
          ></input>


        <select id='roleId' name="role" className={styles.messageInput} value={dataForm.role} onChange={handleOnChange} required>
            <option value="">Roles</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
        </select>

        <select name="active" id="activeId" className={styles.messageInput}  onChange={handleOnChange}>
          <option value="true">Activo</option>
          <option value="false">Desactivado</option>
        </select>

          <input
            id='passwordId'
            name="password"
            placeholder="Ingrese Contraseña"
            className={styles.messageInput}
            value={dataForm.password}
            onChange={handleOnChange}
            required
          ></input>
          
          <button name="submit" className={styles.btn} type="submit">
            Guardar
          </button>
          <Link to='/list' >
            <button name="submit" className={styles.btn} type="submit">
              Ver Usuarios
            </button>
          </Link>
    </form>
  
  )
}
