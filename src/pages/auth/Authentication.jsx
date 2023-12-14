import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    if (window.innerWidth <= 768) {
      alert("Please use desktop to login, this apps not support mobile device");
      // getRedirectResult(auth)
      //   .then((result) => {
      //     const credential = GoogleAuthProvider.credentialFromResult(result);
      //     const token = credential.accessToken;
      //     const user = result.user;
      //     localStorage.setItem("userfb", JSON.stringify(user));
      //     localStorage.setItem("tokenfb", JSON.stringify(token));
      //     setUser(user);
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     const credential = GoogleAuthProvider.credentialFromError(error);
      //     alert(
      //       "Erorr Google Account Auth",
      //       errorCode,
      //       errorMessage,
      //       credential,
      //     );
      //   });
    } else {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          localStorage.setItem("userfb", JSON.stringify(user));
          localStorage.setItem("tokenfb", JSON.stringify(token));
          setUser(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          alert(
            "Erorr Google Account Auth",
            errorCode,
            errorMessage,
            email,
            credential,
          );
        });
    }
  };

  const handleMove = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const data = localStorage.getItem("userfb");
    if (data) {
      const userLocalStorageObject = JSON.parse(data);
      setUser(userLocalStorageObject);
    }
  }, []);
  return (
    <div className="container relative h-screen w-screen">
      {user ? (
        <div className="absolute inset-0 flex content-center items-center justify-center">
          <div className="w-72 text-center text-white">
            <h1 className="pt-1 text-center text-2xl font-bold">
              Welcome to My Group
            </h1>
            <h2 className="text-center text-xl font-bold">Authentication</h2>
            <img
              className="mx-auto rounded-full p-5"
              src={user.photoURL}
              alt={user.displayName}
            />
            <button
              onClick={handleMove}
              className="rounded-full bg-white px-4 py-2 font-bold text-sky-950 hover:bg-slate-300"
            >
              Go to the Apps
            </button>
            <p className="p-2 text-sm opacity-80">Login Success !</p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex content-center items-center justify-center">
          <div className="w-72 text-center text-white">
            <h1 className="pt-1 text-center text-2xl font-bold">
              Welcome to My Group
            </h1>
            <h2 className="pb-5 text-center text-xl font-bold">
              Authentication
            </h2>
            <button
              onClick={handleLogin}
              className="rounded-full bg-white px-4 py-2 font-bold text-sky-950 hover:bg-slate-300"
            >
              Login with Google
            </button>
            <p className="p-2 text-sm opacity-80">
              Please login to access this apps !
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Authentication;
