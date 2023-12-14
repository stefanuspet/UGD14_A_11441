import React from 'react'

import { signOut, getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate()
    const auth = getAuth()
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('Logout Success')
                navigate('/');
                localStorage.clear();
            })
            .catch((error) => {
                console.log('Logout Failed', error)
            })
    }
    return (
        <div className='bg-slate-950 rounded-l-xl w-1/4 text-white relative'>
            <div className='w-full p-5'>
                <h1 className='font-bold text-xl'>Chat to Everyone</h1>
            </div>
            <div className='p-2'>
                <div className='p-4 bg-slate-600 rounded-md w-full flex gap-3 items-center'>
                    <div className='w-1/5'>
                        <img className='rounded-full' src="https://i.pinimg.com/originals/99/d4/70/99d470c797cf431fe16d5518e50fb087.jpg" alt="" />
                    </div>
                    <h1 className='font-medium'>Group Bercandya</h1>
                </div>
            </div>
            <div onClick={handleLogout} className='cursor-pointer flex justify-center bg-slate-600 rounded-t-md hover:bg-sky-700 absolute bottom-0 inset-x-0  p-2'>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar