import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout Success");
        navigate("/");
        localStorage.clear();
      })
      .catch((error) => {
        console.log("Logout Failed", error);
      });
  };
  return (
    <div className="relative w-1/4 rounded-l-xl bg-slate-950 text-white">
      <div className="w-full p-5">
        <h1 className="text-xl font-bold">Chat to Everyone</h1>
      </div>
      <div className="p-2">
        <div className="flex w-full items-center gap-3 rounded-md bg-slate-600 p-4">
          <div className="w-1/5">
            <img
              className="rounded-full"
              src="https://i.pinimg.com/originals/99/d4/70/99d470c797cf431fe16d5518e50fb087.jpg"
              alt=""
            />
          </div>
          <h1 className="font-medium">Group Bercandya</h1>
        </div>
      </div>
      <div
        onClick={handleLogout}
        className="absolute inset-x-0 bottom-0 flex cursor-pointer justify-center rounded-t-md bg-slate-600 p-2  hover:bg-sky-700"
      >
        <button>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
