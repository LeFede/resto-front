import styles from "./LoginForm.module.css"
import { useState, useEffect } from "react"

export const LoginForm = () => {

    const [ error, setError ] = useState({

        email: "",
        password: ""

    })   
    
    const [ login, setLogin ] = useState({

        email: "",
        password: ""

    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setLogin({

            ...login,
            [event.target.name]: event.target.value
        })

        validaciones()
    }

    const validaciones = () => {
        
        let errorValidate = {

            email: "",
            password: ""
        }

        if(login.email.length === 0 ){

            errorValidate.email = "Debe ingresar un email"
        }

        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(login.email)) {

            errorValidate.email = "el email no es valido"
        }

        if(login.email.length > 35) {
        
            errorValidate.email = "el email no puede sobrepasar 35 caracteres"
        }

        if(!/.*\d+.*/.test(login.password)) {

            errorValidate.password = "la contraseña debe contener al menos un número"
        }

        if(login.password.length < 6 || login.password.length > 10) {

            errorValidate.password = "la contraseña debe tener entre 6 y 10 caracteres"
        }

        setError(errorValidate)

    }

    useEffect(() => {

        validaciones()   
    
    }, [login])


    return (

        <form className={styles.contenedorLoginForm}>

            <label htmlFor="email"></label>
            <input type="text" value={login.email} name="email" onChange={handleChange} placeholder="EMAIL"></input>
            <div className={styles.mensajeError}> {error.email !== "" ? <p>{error.email}</p> : ""}</div>

            <label htmlFor="password"></label>
            <input type="text" value={login.password} name="password" onChange={handleChange} placeholder="PASSWORD"></input>
            <div className={styles.mensajeError}> {error.password !== "" ? <p>{error.password}</p> : ""} </div>

            <button>LOG IN</button>

        </form>

    )

}