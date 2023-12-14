import React, { useState, useEffect } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from 'react-router-dom';



function Authentication() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogin = () => {
        const provider = new GoogleAuthProvider();
        if (window.innerWidth <= 768) {
            alert("Please use desktop to login, this apps not support mobile device");
            // getRedirectResult(auth)
            //     .then((result) => {
            //         const credential = GoogleAuthProvider.credentialFromResult(result);
            //         const token = credential.accessToken;
            //         const user = result.user;
            //         localStorage.setItem("userfb", JSON.stringify(user));
            //         localStorage.setItem("tokenfb", JSON.stringify(token));
            //         setUser(user);
            //     }).catch((error) => {
            //         const errorCode = error.code;
            //         const errorMessage = error.message;
            //         const credential = GoogleAuthProvider.credentialFromError(error);
            //         alert("Erorr Google Account Auth", errorCode, errorMessage, credential)
            //     });
        } else {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    localStorage.setItem("userfb", JSON.stringify(user));
                    localStorage.setItem("tokenfb", JSON.stringify(token));
                    setUser(user);
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    alert("Erorr Google Account Auth", errorCode, errorMessage, email, credential)
                });
        }
    }

    const handleMove = () => {
        navigate('/dashboard')
    }

    useEffect(() => {
        const data = localStorage.getItem("userfb");
        if (data) {
            const userLocalStorageObject = JSON.parse(data);
            setUser(userLocalStorageObject);
        }
    }, []);
    return (
        <div className='container w-screen h-screen relative'>
            {user ? (
                < div className='absolute inset-0 flex content-center justify-center items-center' >
                    <div className='w-72 text-center text-white'>
                        <h1 className='text-center pt-1 font-bold text-2xl'>Welcome to My Group</h1>
                        <h2 className='font-bold text-center text-xl'>Authentication</h2>
                        <img className='p-5 mx-auto rounded-full' src={user.photoURL} alt={user.displayName} />
                        <button onClick={handleMove} className='bg-white text-sky-950 font-bold py-2 px-4 rounded-full hover:bg-slate-300'>Go to the Apps</button>
                        <p className='text-sm opacity-80 p-2'>Login Success !</p>
                    </div>
                </div >
            ) : (
                < div className='absolute inset-0 flex content-center justify-center items-center' >
                    <div className='w-72 text-center text-white'>
                        <h1 className='text-center pt-1 font-bold text-2xl'>Welcome to My Group</h1>
                        <h2 className='font-bold text-center text-xl pb-5'>Authentication</h2>
                        <button onClick={handleLogin} className='bg-white text-sky-950 font-bold py-2 px-4 rounded-full hover:bg-slate-300'>Login with Google</button>
                        <p className='text-sm opacity-80 p-2'>Please login to access this apps !</p>
                    </div>
                </div >
            )}
        </div >
    )
}

export default Authentication