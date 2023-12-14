import React from "react";
import { useState, useEffect, useRef } from "react";
import { ref, onValue, getDatabase, remove } from "firebase/database";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PropTypes from "prop-types";
import app from "../../firebaseConfig";

function BubbleChat({ setEdit, setTempMessage, setDataid }) {
  const [messages, setMessages] = useState([]);
  const [uid, setUid] = useState("");
  const [deleteOptions, setDeleteOptions] = useState({});
  const messagesEndRef = useRef(null);

  const handleDotIconClick = (index) => {
    setDeleteOptions((prevOptions) => ({
      ...prevOptions,
      [index]: !prevOptions[index],
    }));
  };

  const db = getDatabase(app);
  const messagesRef = ref(db, "group/messages");

  const handleDeleteClick = (data, index) => {
    remove(ref(db, "group/messages/" + `${data}`))
      .then(() => {
        console.log("Remove succeeded.");
        handleDotIconClick(index);
      })
      .catch((error) => {
        console.log("Remove failed: " + error.message);
      });
  };

  const handleEditClick = (data, index) => {
    setEdit(true);
    setDataid(data.id);
    setTempMessage(data.message);
    handleDotIconClick(index);
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userfb"));
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {messages.map((data, index) =>
        uid === data.sender.uid ? (
          <div
            key={index}
            className="mt-3 flex items-start justify-end gap-2.5"
          >
            <div className="leading-1.5 flex w-full max-w-[320px] flex-col rounded-ee-lg rounded-es-lg rounded-ss-lg border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
              <div className="flex items-center justify-between space-x-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {data.sender.displayName}
                </span>
                <div className="relative">
                  <HiOutlineDotsHorizontal
                    className="cursor-pointer text-gray-400 hover:text-gray-200"
                    onClick={() => handleDotIconClick(index)}
                  />

                  <div
                    className={
                      deleteOptions[index]
                        ? "text-slate-900te- absolute right-6 top-0 w-20 rounded-lg bg-slate-500 p-1"
                        : "hidden"
                    }
                  >
                    <div
                      onClick={() => handleEditClick(data, index)}
                      className="cursor-pointer border-b-2 border-b-gray-900 border-opacity-40 p-1 text-center"
                    >
                      <p>Edit</p>
                    </div>
                    <div
                      onClick={() => handleDeleteClick(data.id, index)}
                      className="cursor-pointer p-1 text-center"
                    >
                      <p>Delete</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
                {data.message}
              </p>
              <div className="flex justify-end">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {new Date(data.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
            <img
              className="h-8 w-8 rounded-full"
              src={data.sender.photoURL}
              alt={data.sender.displayName}
            />
          </div>
        ) : (
          <div key={index} className="mt-3 flex items-start gap-2.5">
            <img
              className="h-8 w-8 rounded-full"
              src={data.sender.photoURL}
              alt={data.sender.displayName}
            />
            <div className="leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
              <div className="flex items-center justify-between space-x-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {data.sender.displayName}
                </span>
              </div>
              <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
                {data.message}
              </p>
              <div className="flex justify-end">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {new Date(data.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ),
      )}
      <div ref={messagesEndRef} />
    </>
  );
}

BubbleChat.propTypes = {
  setEdit: PropTypes.func.isRequired,
  setTempMessage: PropTypes.func.isRequired,
  setDataid: PropTypes.func.isRequired,
};

export default BubbleChat;
