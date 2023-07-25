import styles from "./LoginForm.module.css"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserRol, setUserRolLogout } from "@/redux"
// import app from "@/firebase.config"
// @ts-ignore
import  app  from "@/firebase.config"
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth"
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

export const LoginForm = () => {
    
    // const firestore = getFirestore(app)
    const provider = new GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
    const auth = getAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ authorizedUser, setAuthorizedUser ] = useState(false || sessionStorage.getItem("accessToken"))
    const [ sessionUserId, setSessionUserId ] = useState(false || sessionStorage.getItem("userId"))

    const handleGoogleSignIn = async () => {

        try {
            let userRole;
            const result = await signInWithPopup(auth, provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // @ts-ignore
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            // @ts-ignore
            const userId = user.uid
            const accessToken = (user as any).accessToken
            // console.log(user);
    
            if(user){
                const tkn = await user.getIdToken();
                // set access token in session storage
                sessionStorage.setItem("accessToken", tkn);
                // set access token in session storage
                sessionStorage.setItem("userId", userId);
                // @ts-ignore
                setAuthorizedUser(true);
                // @ts-ignore
                setSessionUserId(true);
                    
                //const obtenerUsuario = await fetch(`http://localhost:3000/users/${userId}`, {
                const response = await fetch(`http://resto-back-production-2867.up.railway.app/users/${userId}/role`, {
                    headers:{
                        'Authorization': `Bearer ${accessToken}`
                    }
                })

                if (!response.ok) {
                    if (response.status === 401) userRole = 'client';
                } else {
                    userRole = await response.json()
                    console.log("🚀 ~ file: index.tsx:60 ~ userRole:", userRole)
                }

                
            }
            
            dispatch(setUserRol(userRole))

            if (!['employee', 'admin'].includes(userRole)){
                sessionStorage.setItem('isClient', 'true')
            } else {
                sessionStorage.setItem('isClient', 'false')
            }
            
            userRole === "admin" ? navigate("/admin") : navigate("/")


        } catch (error) {
            // Handle Errors here.
             // @ts-ignore
            const errorCode = error.code;
             // @ts-ignore
            const errorMessage = error.message;
            // The email of the user's account used.
             // @ts-ignore
            const email = error.customData?.email;
            // The AuthCredential type that was used.
             // @ts-ignore
            const credential = GoogleAuthProvider.credentialFromError()
        }
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();
        // console.log("entre a handleLogin")
        try {
            let userRole;
            const result = await signInWithEmailAndPassword(auth, login.email, login.password);
            console.log(result)
            // User successfully logged in
            const user = result.user;
            // @ts-ignore
            const userId = user.uid
            const accessToken = (user as any).accessToken
            // console.log(user);

            if(user){
                const tkn = await user.getIdToken();
                // set access token in session storage
                sessionStorage.setItem("accessToken", tkn);
                // set userId in session storage
                sessionStorage.setItem("userId", userId);
                // @ts-ignore
                setAuthorizedUser(true);
                // @ts-ignore
                setSessionUserId(true);
    
                // console.log("antes de request")
                // const obtenerUsuario = await fetch(`http://resto-back-production-2867.up.railway.app/users/${userId}`, {
                const obtenerUsuario = await fetch(`http://resto-back-production-2867.up.railway.app/users/${userId}/role`, {
                        headers:{
                            'Authorization': `Bearer ${accessToken}`
                        },
                    })
                    
                // console.log(obtenerUsuario)
                userRole = await obtenerUsuario.json()
                // console.log(userRole)
                
            }

            dispatch(setUserRol(userRole))
            if (!['employee', 'admin'].includes(userRole)){
                sessionStorage.setItem('isClient', 'true')
            } else {
                sessionStorage.setItem('isClient', 'false')
            }
            
            userRole === "admin" ? navigate("/admin") : navigate("/")

        } catch (error) {
            Swal.fire({
                title: 'Mal',
                text: 'Usuario o contraseña equivocada',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
            // console.error('Error signing in:', (error as any).message);
          // Handle login error (show an error message, etc.)
        }
      };

    const logoutUser = () => {

        signOut(auth).then(() => {

            sessionStorage.clear()
             // @ts-ignore
            setAuthorizedUser(false);
             // @ts-ignore
            setSessionUserId(false);

            Swal.fire({
                title: 'Bien',
                text: 'Has cerrado sesión correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });

        })

        dispatch(setUserRolLogout())

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

    const protectRoute = async () => {
        if (authorizedUser && sessionStorage.getItem('isClient') === 'false') {
            const response = await fetch(`http://resto-back-production-2867.up.railway.app/users/${sessionUserId}/role`, {
                headers:{
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
            const role = await response.json()
            dispatch(setUserRol(role))
        }
    }
    
    useEffect(() => {
    
        validaciones()
        protectRoute()
    }, [login])

    return (

        <div>

            {authorizedUser ? (
                // TODO: darle estilo a este bloque <p> y <button>
                // TODO: poner un boton de volver y otro boton de ir a carrito o algo y darle estilos

                <>
                    <p>Usuario autorizado como cliente</p>
                    <button onClick={logoutUser}>CERRAR SESION</button>
                    
                </>
            ): (

            <>
                <form className={styles.contenedorLoginForm}>

                    <label htmlFor="email"></label>
                    <input type="text" value={login.email} name="email" onChange={handleChange} placeholder="EMAIL"></input>
                    <div className={styles.mensajeError}> {error.email !== "" ? <p>{error.email}</p> : ""}</div>
            
                    <label htmlFor="password"></label>
                    <input type="password" value={login.password} name="password" onChange={handleChange} placeholder="PASSWORD"></input>
                    <div className={styles.mensajeError}> {error.password !== "" ? <p>{error.password}</p> : ""} </div>
            
                    <button type="button" onClick={handleLogin}>LOG IN</button>
            
                </form>
                <div>
                    <button onClick={handleGoogleSignIn}>LOG IN CON GOOGLE</button>
                </div>
            </>  
            
        )}

        </div>
    )

}