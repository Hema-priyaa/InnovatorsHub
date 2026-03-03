import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContextAPI } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { __AUTH } from "../../backend/FirebaseConfig";
import { UserContextAPI } from "../../context/UserContext";
import Spinner from "../../helpers/Spinner";

const Menu = () => {
  const { authUser } = useContext(AuthContextAPI);
  let {user_profile,isLoading}=useContext(UserContextAPI)
  let navigate= useNavigate()

  const logout=async()=>{
    try{
      await signOut(__AUTH)
      toast.success("Logged Out")
      navigate("/auth/login")
    }catch(error){
      toast.error(error.message)
    }
  }

  // console.log(user_profile.admin);

  return (
    <aside>
      <ul className="flex gap-1 font-semibold items-center">
    {user_profile?.role === "admin" && authUser && (
      <li>
          <NavLink
            to="/admin"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${
                isActive && "bg-blue-400"
              }`;
            }}
          >
            Admin
          </NavLink>
        </li>)}

        <li>
          <NavLink
            to="/"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${
                isActive && "bg-blue-400"
              }`;
            }}
          >
            Home
          </NavLink>
        </li>

        {authUser ? (
          <>
          <li>
              <button
                className="py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800"
                onClick={logout}
              >
                Logout
              </button>
            </li>
            <li>
              <NavLink to="/user-profile"><img src={authUser.photoURL} className="h-[50px] w-[50px] rounded-full"/></NavLink>
            </li>
            </>
        ) : (
          <>
            <li>
              <NavLink
                to="auth/login"
                className={(obj) => {
                  let { isActive } = obj;
                  return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${
                    isActive && "bg-blue-400"
                  }`;
                }}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="auth/register"
                className={(obj) => {
                  let { isActive } = obj;
                  return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${
                    isActive && "bg-blue-400"
                  }`;
                }}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {isLoading && <Spinner/>}
    </aside>
  );
};

export default Menu;

// // import { useContext } from "react";
// import { AuthContextAPI } from "../context/AuthProvider";
// import { signOut } from "firebase/auth";
// import { __AUTH } from "../backend/FirebaseConfig";

// const Navbar = () => {
//     const { authUser, setAuthUser } = useContext(AuthContextAPI);

//     const handleLogout = async () => {
//         await signOut(__AUTH);
//         setAuthUser(null); // Reset user state
//     };

//     return (
//         <nav className="p-4 bg-gray-800 text-white flex justify-between">
//             <h1 className="text-xl">🔥 My App</h1>
//             {authUser ? (
//                 <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
//                     Logout
//                 </button>
//             ) : (
//                 <div>
//                     <a href="/login" className="mr-4">Login</a>
//                     <a href="/register">Register</a>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;
