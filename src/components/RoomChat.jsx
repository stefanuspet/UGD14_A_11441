import React, { useEffect, useState } from 'react'
import BubbleChat from './BubbleChat'
import { AiFillMessage } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { set, ref, getDatabase, update } from 'firebase/database';
import app from '../../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

function RoomChat({ key }) {
    const [message, setMessage] = useState("");
    const [edit, setEdit] = useState(false);
    const [dataid, setDataid] = useState("");
    const id = uuidv4();

    const handleOnChange = (e) => {
        setMessage(e.target.value);
        console.log(message, "this is message");
    };
    const db = getDatabase(app);


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (edit == true) {
                update(ref(db, 'group/messages/' + `${dataid}`), {
                    message: message,
                });
                setEdit(false);
                setMessage("");
            } else {
                const userfb = JSON.parse(localStorage.getItem('userfb'));
                await set(ref(db, "group/messages" + `/${id}`), {
                    id: id,
                    message: message,
                    sender: {
                        displayName: userfb.displayName,
                        email: userfb.email,
                        photoURL: userfb.photoURL,
                        uid: userfb.uid,
                    },
                    timestamp: Date.now(),
                })
                    .then(() => {
                        console.log('Write successful');
                        setMessage("");
                    })
                    .catch((error) => {
                        console.error('Write error:', error);
                    });
            }
        } catch (error) {
            console.error('Caught an error:', error);
        }
    }

    console.log(message, "this is message");
    return (
        <div key={key} className='bg-slate-800 w-3/4 rounded-r-xl relative overflow-hidden '>
            <div className='bg-slate-900 text-white font-medium p-5 rounded-tr-xl absoulute top-0 right-0 left-0'>
                Group Bercandya
            </div>
            <div className='no-scrollbar overflow-y-auto max-h-[calc(100vh-172px)] pt-5 pl-5 pr-5 pb-16'>
                <BubbleChat setEdit={setEdit} setTempMessage={setMessage} setDataid={setDataid} />
            </div>
            <form onSubmit={handleOnSubmit} className="flex items-center p-5 absolute bottom-0 left-0 right-0 z-10">
                <label htmlFor="simple-message" className="sr-only">Send</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <AiFillMessage className='text-gray-400' />
                    </div>
                    <input onChange={handleOnChange} value={message} type="text" id="simple-message" className="border text-sm rounded-lg block w-full ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none" placeholder="Send Your Message" required />
                </div>
                <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <IoMdSend className='text-white text-xl' />
                </button>
            </form>
        </div>

    )
}
export default RoomChat