import { useState } from "react";
import BubbleChat from "./BubbleChat";
import { AiFillMessage } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { set, ref, getDatabase, update } from "firebase/database";
import app from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";

function RoomChat() {
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const [dataid, setDataid] = useState("");
  const id = uuidv4();

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };
  const db = getDatabase(app);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit == true) {
        update(ref(db, "group/messages/" + `${dataid}`), {
          message: message,
        });
        setEdit(false);
        setMessage("");
      } else {
        const userfb = JSON.parse(localStorage.getItem("userfb"));
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
            console.log("Write successful");
            setMessage("");
          })
          .catch((error) => {
            console.error("Write error:", error);
          });
      }
    } catch (error) {
      console.error("Caught an error:", error);
    }
  };

  return (
    <div className="relative w-3/4 overflow-hidden rounded-r-xl bg-slate-800 ">
      <div className="absoulute left-0 right-0 top-0 rounded-tr-xl bg-slate-900 p-5 font-medium text-white">
        Group Bercandya
      </div>
      <div className="no-scrollbar max-h-[calc(100vh-172px)] overflow-y-auto pb-16 pl-5 pr-5 pt-5">
        <BubbleChat
          setEdit={setEdit}
          setTempMessage={setMessage}
          setDataid={setDataid}
        />
      </div>
      <form
        onSubmit={handleOnSubmit}
        className="absolute bottom-0 left-0 right-0 z-10 flex items-center p-5"
      >
        <label htmlFor="simple-message" className="sr-only">
          Send
        </label>
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <AiFillMessage className="text-gray-400" />
          </div>
          <input
            onChange={handleOnChange}
            value={message}
            type="text"
            id="simple-message"
            className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5  ps-10 text-sm text-white placeholder-gray-400 outline-none"
            placeholder="Send Your Message"
            required
          />
        </div>
        <button
          type="submit"
          className="ms-2 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <IoMdSend className="text-xl text-white" />
        </button>
      </form>
    </div>
  );
}
export default RoomChat;
