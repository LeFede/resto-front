import { IMenu,  State } from "@/types";
import styles from "./PanelAdmin.module.css"

import { useSelector } from "react-redux";
import { on, off, pen } from "@/assets";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";



export const PanelAdmin= () => {
  const  menus = useSelector((state: State) => state.menus);


  const [updatedPrice, setUpdatedPrice] = useState('')

  const [idToUpdate,setIdToUpdate] = useState('')

  // const dispatch = useDispatch()

  // useEffect(()=>{
  //   
  // },[])
  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    if(/^([0-9]\d*)?$/.test(event.target.value)){
      setUpdatedPrice(event.target.value)
    }
    
  };

  const handleEdit = (dishId: string )=>{
    setIdToUpdate(dishId)
  }

  const handleToggle = async(dishId: string , isActive:boolean)=>{
    const id = dishId
    const isDishActive = isActive
    const fetchToggle = async( dishId:string , isActive:boolean)=>{
      if(dishId){
        const requestOption =  
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(
                {
                  "active": !isActive
                }
              ),
            }
      
            const response = await fetch(
              `http://resto-back-production-2867.up.railway.app/dish/toggle/${dishId}`,
              requestOption
            );
            const data = await response.json()
            return data
      }
    }
    fetchToggle(id,isDishActive)
  }

  const fetchPriceUpdate = async( dishId:string , newPrice:number)=>{
    if(dishId && newPrice){
      const requestOption =  
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                "price": newPrice
              }
            ),
          }
    
          const response = await fetch(
            `http://resto-back-production-2867.up.railway.app/dish/${dishId}`,
            requestOption
          );
          const data = await response.json()
          return data
    }
  }

  
//   const auth = getAuth()

//   const logoutUser = () => {

//     signOut(auth).then(() => {

//         sessionStorage.clear()
//          // @ts-ignore
//         setAuthorizedUser(false);

//         alert('Has cerrado sesión correctamente')

//     })

//     dispatch(setUserRolLogout())

// }

//   if(userRol !== "admin") {

//     return(

//       <WithoutPermissions/>
      
//     )
//   }

  return (
    <section>
        <nav className={styles.nav}> 
            <Link to={"/menu"}><button>Crear Usuarios</button></Link>
            <Link to={"/dish"}><button>Crear Plato</button></Link>
            <Link to={"/menu"}><button>Asignar Mesas</button></Link>
            <Link to={"/dashboard"}><button>Ordenes</button></Link>
            {/* <Link onClick={logoutUser} to={"/"}><button>LogOut</button></Link> */}
        </nav>

    <section className={styles.container}>
        
      {menus.map((dish: IMenu) => {
      
      return (

            <div className={styles.dish}>
            <div className={styles.left}>
              <h6>{dish.title}</h6>
              <h6><b>{dish.active?'Activo':'Inactivo'}</b></h6>
              <p>{dish.description}</p><br/>
              
            </div>
            <button onClick={()=>handleEdit(dish._id.toString())} className={styles.edit}>
              <img src={pen} alt="edit" />
            </button>
            {dish.active?
              <button onClick={()=>handleToggle(dish._id.toString(),dish.active)} className={styles.edit}>
              <img src={on} alt="edit" />
            </button>
            :<button onClick={()=>handleToggle(dish._id.toString(),dish.active)} className={styles.edit}>
            <img src={off} alt="edit" />
          </button>
            }
            
            <div className={styles.right}>
              <h6>${dish.price}</h6>
            </div>
            
           
                
            
          </div>
        )
      })}

    <div>
      <label htmlFor="price">Precio: </label>
      <input type="text" name="updatePrice" value={updatedPrice} onChange={handleOnChange}/>
      <button onClick={()=>fetchPriceUpdate(idToUpdate,+updatedPrice)}>actualizar precio</button>
    </div>

    </section>
    </section>
    
  )
}