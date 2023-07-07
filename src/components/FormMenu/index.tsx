import { useState } from 'react'
import styles  from './FormMenu.module.css'

export const FormMenu = () => {

  const [userData, setUserData]  = useState({
    name:'',
    precio:'',
    descripcion:'',
    tipo:''

})

  const handlerChange = (event)=>{
    event.preventDefault()
    console.log(event);
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })
    

  }

  return(
    <div className={styles.formMenu}>
      <h1>Form</h1>
      <form>
          <select className={styles.input_select} onChange={handlerChange } name="tipo" id="">
          <option value="">Tipo</option>
            <option value="normal">Normal</option>
            <option value="vegano">Vegano</option>
          </select>
            <br />
          <label className={styles.label_form} htmlFor="name">Nombre</label>
          <input className={styles.input_form} type="text" name="name" placeholder="Nombre de alimento..." onChange={handlerChange } />
          <br />
         
          <label htmlFor="precio">Precio</label>
          <input className={styles.input_form} type="text" name="precio" placeholder="Precio...."onChange={handlerChange }  />
            <br />
          <label htmlFor="descripcion">Descripcion</label>
          <input className={styles.input_form} type="text" name="descripcion" placeholder="Descripcion...." onChange={handlerChange } />
          
          <button className={styles.btn} type='submit'>Guardar</button>
      </form>
    </div>
  )

  
}
