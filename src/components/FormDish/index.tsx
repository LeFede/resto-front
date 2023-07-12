import { Dishdata } from '@/types'
import styles from './Dish.module.css'
import { ChangeEvent, FormEvent, useState } from 'react';



export const DishForm = () => {

    const initialData: Dishdata = {
        title:'',
        price:0,
        description: '',
        categories: '',
        imagen: '',
        ingredientes: [],
    }

    const [dataForm, setDataForm] = useState<Dishdata>(initialData);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setDataForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(dataForm);
    };
  

  return (
    <form className={styles.formDish} onSubmit={handleSubmit}>
		<input name="title" placeholder="Nombre" className={styles.titleform} required onChange={handleOnChange}/>
		<input name="price" placeholder="Precio" className={styles.titleform} type="number" required onChange={handleOnChange}/>
        <input name="imagen" placeholder="Imagen" className={styles.titleform} required  onChange={handleOnChange}/>
        <input name="ingredientes" placeholder="ingredientes" className={styles.titleform} type="text" required onChange={handleOnChange}/>
        <textarea  name="description" placeholder="Notas" className={styles.message} onChange={handleOnChange} required></textarea>
        <select name='categories' className={styles.categories} onChange={handleOnChange}>
            <option value="main">main</option>
            <option value="appetiezer">appetiezer</option>
            <option value="dessert">dessert</option>
            <option value="drinks">drinks</option>
        </select>
        <button name="submit" className={styles.btn} type="submit" value="" >Guardar</button>
    </form>
  )
}
