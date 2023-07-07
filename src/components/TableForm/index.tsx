import styles from './TableForm.module.css'
import { InputSelect } from '@/types'
import { useState } from 'react'


export const TableForm = () => {

    
  const [userData, setUserData]  = useState({
    size:'',
    mesa:''
  })

    const handlerChange = (event: InputSelect)=>{
        event.preventDefault()
        console.log(event);
        setUserData({
          ...userData,
          [event.target.name]: event.target.value
        })
    }

  return (
    <div className={styles.formTable}>
    <h1>Form</h1>
    <form>
        
        <label className={styles.label_form} htmlFor="mesa">Numero de Mesa</label>
        <input className={styles.input_form} type="text" name="mesa" placeholder="Nombre de mesa..." onChange={handlerChange } />
        <br />
       
       
        <label className={styles.label_form} htmlFor="size">Descripcion</label>
        <input className={styles.input_form} type="text" name="size" placeholder="Tamaño de la mesa...." onChange={handlerChange } />
        
        <button className={styles.btn} type='submit'>Guardar</button>
    </form>
  </div>
  )
}
