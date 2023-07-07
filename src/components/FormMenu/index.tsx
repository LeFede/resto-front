import { useState } from 'react'
import styles  from './FormMenu.module.css'
import { FormMenuData, InputSelect } from '@/types'

export const FormMenu = () => {

  const [userData, setUserData]: [FormMenuData, Function] = useState({
    name: '',
    precio: '',
    descripcion: '',
    tipo: '',
  })

  const handleChange = (event: InputSelect): void => {
    event.preventDefault()
    const { target } = event
    const { name, value } = target

    setUserData({
      ...userData,
      [name]: value
    })
  }

  return(
    <div className={styles.formMenu}>
      <h1>Form</h1>
      <form>
          <select className={styles.input_select} onChange={handleChange} name="tipo" id="">
          <option value="">Tipo</option>
            <option value="normal">Normal</option>
            <option value="vegano">Vegano</option>
          </select>
            <br />
          <label className={styles.label_form} htmlFor="name">Nombre</label>
          <input className={styles.input_form} type="text" name="name" placeholder="Nombre de alimento..." onChange={handleChange} />
          <br />

          <label htmlFor="precio">Precio</label>
          <input className={styles.input_form} type="text" name="precio" placeholder="Precio...." onChange={handleChange}  />
            <br />
          <label htmlFor="descripcion">Descripcion</label>
          <input className={styles.input_form} type="text" name="descripcion" placeholder="Descripcion...." onChange={handleChange} />
          
          <button className={styles.btn} type='submit'>Guardar</button>
      </form>
    </div>
  )

  
}
