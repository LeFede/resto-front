import { DishDataError, Dishdata, State } from '@/types'
import styles from './Dish.module.css'
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postMenu } from '../../redux';
import { validate } from '../../utils';


export const DishForm = () => {
    const dispatch = useDispatch();
    const { menus } = useSelector((state: State) => state)

    const initialData: Dishdata = {
        title:'',
        price:0,
        description: '',
        categories: '',
        image: '',
        reviews: [],
        active: true
    }

    const initialErrorData: DishDataError = {
        title:'',
        price:'',
        description: '',
        categories: '',
        image: ''
    }

    const [form, setForm] = useState<Dishdata>(initialData);
    const [errors, setErrors] = useState<DishDataError>(initialErrorData);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      setErrors(validate({...form, [name]: value}))
    };
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (Object.keys(errors).length > 0) return;      
      dispatch(postMenu(form))
      clearForm()
      console.log(menus);
    };

    const clearForm = () => {
      setForm(initialData);
      setErrors(initialErrorData)
    }
  

  return (
    <form className={styles.formDish} onSubmit={handleSubmit}>
      <h4 className={styles.title}>Crear Menu</h4>
      <label htmlFor='title'>Nombre</label>
      <input name="title" placeholder="Nombre" className={styles.titleform} onChange={handleOnChange} value={form.title}/>
      {
        errors.title ? <p className={styles.error}>{errors.title}</p> : ''
      }
      <label htmlFor='price'>Precio</label>
      <input name="price" placeholder="Precio" className={styles.titleform} type="number" onChange={handleOnChange} value={form.price}/>
      {
        errors.price ? <p className={styles.error}>{errors.price}</p> : ''
      }
      <label htmlFor='image'>Imágen</label>
      <input name="image" placeholder="Imagen" className={styles.titleform} onChange={handleOnChange} value={form.image}/>
      {
        errors.image ? <p className={styles.error}>{errors.image}</p> : ''
      }
      <label htmlFor='description'>Descripción</label>
      <textarea  name="description" placeholder="Notas" className={styles.message} onChange={handleOnChange} value={form.description}></textarea>
      {
        errors.description ? <p className={styles.error}>{errors.description}</p> : ''
      }
      <label htmlFor='categories'>Categoría</label>
      <select name='categories' className={styles.categories} onChange={handleOnChange} value={form.categories}>
        <option>Elije una opción</option>
        <option value="main">Plato principal</option>
        <option value="appetizer">Entrada</option>
        <option value="dessert">Postre</option>
        <option value="drinks">Bebida</option>
      </select>
      {
        errors.categories ? <p className={styles.error}>{errors.categories}</p> : ''
      }
      <button name="submit" className={styles.btn} type="submit" disabled={Object.keys(errors).length > 0} >Guardar</button>
    </form>
  )
}
