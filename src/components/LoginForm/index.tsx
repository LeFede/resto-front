import styles from "./LoginForm.module.css"
import { useState, useEffect } from "react"
// import app from "@/firebase.config"
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth"
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
import axios from "axios"

export const LoginForm = () => {
    
    // const firestore = getFirestore(app)
    const provider = new GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
    const auth = getAuth()

    const [ authorizedUser, setAuthorizedUser ] = useState(false || sessionStorage.getItem("accessToken"))
    
    const handleGoogleSignIn = () => {

        signInWithPopup(auth, provider)
        
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            const userId = user.uid
            console.log(user);
            fetchUser(user)

            if(user){
                user.getIdToken().then((tkn)=>{
                  // set access token in session storage
                  sessionStorage.setItem("accessToken", tkn);
                // @ts-ignore
                  setAuthorizedUser(true);
                })
              }
              console.log(user.uid);
              
          })

          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
          });
    }

    const logoutUser = () => {

        signOut(auth).then(() => {

            sessionStorage.clear()
             // @ts-ignore
            setAuthorizedUser(false);

            alert('Has cerrado sesión correctamente')

        })

    }

    const fetchUser = async(userId: any) => {

        const { data } = await axios.get(`http://resto-back-production-2867.up.railway.app/users/${userId}`)
        return data
        console.log(data)
    }
    
    const fetchData = async({token}: any)=>{
        const response = await axios.get('http://resto-back-production-2867.up.railway.app/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log(response.data)
        
        useEffect(()=>{
            if(token){
             fetchData(token);
            }
        },[]);

    }

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

        <div>

            {authorizedUser ? (

                <>
                    <p>Usuario autorizado</p>
                    <button onClick={logoutUser}>CERRAR SESION</button>
                    
                </>
            ): (

            <>
                <form className={styles.contenedorLoginForm}>

                    <label htmlFor="email"></label>
                    <input type="text" value={login.email} name="email" onChange={handleChange} placeholder="EMAIL"></input>
                    <div className={styles.mensajeError}> {error.email !== "" ? <p>{error.email}</p> : ""}</div>
            
                    <label htmlFor="password"></label>
                    <input type="text" value={login.password} name="password" onChange={handleChange} placeholder="PASSWORD"></input>
                    <div className={styles.mensajeError}> {error.password !== "" ? <p>{error.password}</p> : ""} </div>
            
                    <button>LOG IN</button>
            
                </form>
                
                <button onClick={handleGoogleSignIn}>LOG IN CON GOOGLE</button>
            </>  
            
        )}

        </div>
    )

}