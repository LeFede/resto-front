import { IMenu,  State } from "@/types";
import styles from "./PanelAdmin.module.css"
import {  useSelector } from "react-redux";
import { pen } from "@/assets";
import { Link } from "react-router-dom";



export const PanelAdmin= () => {
  const  menus = useSelector((state: State) => state.menus);

  
  
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
              <p>{dish.description}</p>
            </div>
            <button className={styles.edit}>
              <img src={pen} alt="edit" />
            </button>
            <div className={styles.right}>
              <h6>${dish.price}</h6>
            </div>
            
           
                
            
          </div>
        )
      })}
    </section>
    </section>
    
  )
}