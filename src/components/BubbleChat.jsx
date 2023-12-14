import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { ref, onValue, getDatabase, remove } from 'firebase/database';
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import app from '../../firebaseConfig';

function BubbleChat({ setEdit, setTempMessage, setDataid }) {
    const [messages, setMessages] = useState([]);
    const [uid, setUid] = useState("");
    const [deleteOptions, setDeleteOptions] = useState({});
    const messagesEndRef = useRef(null);

    const handleDotIconClick = (index) => {
        setDeleteOptions(prevOptions => ({
            ...prevOptions,
            [index]: !prevOptions[index]
        }));
    };

    const db = getDatabase(app);
    const messagesRef = ref(db, 'group/messages');

    const handleDeleteClick = (data, index) => {
        remove(ref(db, 'group/messages/' + `${data}`))
            .then(() => {
                console.log('Remove succeeded.');
                handleDotIconClick(index);
            })
            .catch((error) => {
                console.log('Remove failed: ' + error.message);
            });
    };

    const handleEditClick = (data, index) => {
        setEdit(true);
        setDataid(data.id);
        setTempMessage(data.message);
        handleDotIconClick(index);
    };



    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('userfb'));
        setUid(id.uid);
        const readChat = onValue(messagesRef, (snapshot) => {
            if (snapshot.exists()) {
                const messagesData = snapshot.val();
                const messagesArray = Object.values(messagesData);

                messagesArray.sort((a, b) => a.timestamp - b.timestamp);

                setMessages(messagesArray);
            } else {
                setMessages([]);
            }
        });

        return () => {
            readChat();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    return (
        <>
            {
                messages.map((data, index) => (
                    uid === data.sender.uid ? (
                        <div key={index} className="flex items-start justify-end gap-2.5 mt-3">
                            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-ss-lg rounded-ee-lg rounded-es-lg dark:bg-gray-700">
                                <div className="flex items-center justify-between space-x-2">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{data.sender.displayName}</span>
                                    <div className='relative'>
                                        <HiOutlineDotsHorizontal className='text-gray-400 cursor-pointer hover:text-gray-200'
                                            onClick={() => handleDotIconClick(index)} />

                                        <div className={deleteOptions[index] ? 'absolute p-1 w-20 rounded-lg bg-slate-500 text-slate-900te- top-0 right-6' : "hidden"}>
                                            <div onClick={() => handleEditClick(data, index)} className='border-b-gray-900 border-opacity-40 border-b-2 p-1 text-center cursor-pointer'>
                                                <p>Edit</p>
                                            </div>
                                            <div onClick={() => handleDeleteClick(data.id, index)} className='p-1 text-center cursor-pointer'>
                                                <p>Delete</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{data.message}</p>
                                <div className='flex justify-end'>
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                            <img className="w-8 h-8 rounded-full" src={data.sender.photoURL} alt={data.sender.displayName} />
                        </div>
                    ) : (
                        <div key={index} className="flex items-start gap-2.5 mt-3">
                            <img className="w-8 h-8 rounded-full" src={data.sender.photoURL} alt={data.sender.displayName} />
                            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                <div className="flex items-center justify-between space-x-2">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{data.sender.displayName}</span>
                                </div>
                                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{data.message}</p>
                                <div className='flex justify-end'>
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        </div>
                    )
                ))
            }
            <div ref={messagesEndRef} />

        </>
    )
}

export default BubbleChat