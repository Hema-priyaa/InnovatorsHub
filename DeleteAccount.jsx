import { deleteUser } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { AuthContextAPI } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { __DB } from "../../backend/FirebaseConfig";
import { UserContextAPI } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import { __AUTH } from "../../backend/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
// import Spinner from "../../Helpers/Spinner";


const DeleteAccount = () => {
  let { user_profile } = useContext(UserContextAPI);
  let { authUser } = useContext(AuthContextAPI);
  let[togglePassword,settogglePassword]=useState(false)
    let {isLoading}=useContext(UserContextAPI)
  let [isDelete, setisDelete] = useState(false);
  // const [isVerified, setIsVerified] = useState(false);
    let navigate = useNavigate();

  let[data,setdata]=useState({
      email:"",
      password:"",
      newPassword:"",
      newconfirmPassword:""
    })


  const handleVerify = async (e) => {
    e.preventDefault();
    console.log("Auth User Email:", authUser?.email);
console.log("Entered Email:", data.email);

    try {
      const credential = EmailAuthProvider.credential(authUser.email, data.password);
      const userCredential = await reauthenticateWithCredential( authUser,credential);
      // const user=userCredential.user
      // toast.success("Password verified! You can now update your password.");
      // setIsVerified(true);
      // if (user) {
        let user_collection=doc(__DB,"user_profile",authUser?.uid)
        await deleteDoc(user_collection)
        await deleteUser(authUser);
        toast.success("Account deleted successfully");
        navigate("/auth/register");
      // }
    }
     catch (error) {
      console.log(error);
      toast.error("Verification failed")
      
    }
    finally{
      // setisLoading(false)
    }
  };

  const handlechange=(e)=>{
    let value=e.target.value
    let key=e.target.name
    setdata({...data,[key]:value})
  }

  let handleDelete=()=>{
    setisDelete(true)
  }

  //   let handleChange = (e) => {
  //     setText(e.target.value);
  //   };

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     // if (isVerified) {
    //     //   let user_collection=doc(__DB,"user_profile",authUser?.uid)
    //     //   await deleteDoc(user_collection)
    //     //   await deleteUser(authUser);
    //     //   toast.success("Account deleted successfully");
    //     //   navigate("/auth/register");
    //     }
    //   } catch (error) {
    //     if (error) {
    //       toast.error(error.message);
    //     }
    //   }
    // };

  //   return (
  //     <section className="h-[100%] w-[100%] flex justify-center items-center">
  //       <article className="min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4">
  //         <h2 className="text-center text-2xl">Delete Account</h2>
  //         <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
  //           <div>
  //             <h3>Are You sure You want to delete the account?</h3>
  //             <h3>If yes, Enter Delete Account !</h3>
  //           </div>
  //           <input
  //             type="text"
  //             id="DeleteAccount"
  //             placeholder="Delete Account"
  //             className="px-4 py-2 outline-none rounded-lg bg-white text-black"
  //             name=""
  //           />
  //           <button
  //             className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800"
  //             onClick={handleChange}
  //           >
  //             Delete Account
  //           </button>
  //         </form>
  //       </article>
  //       {isLoading && <Spinner/>}
  //     </section>
  //   );

  return (
    <section className="h-[100%] w-[100%] bg-gray-400 flex justify-center items-center relative">
      <article className="min-h-[420px] w-[40%] bg-amber-100 rounded-xl p-4">
        {isDelete?(<>
        <form className="text-black flex flex-col gap-2" onSubmit={handleVerify} >
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        placeholder="Enter email"
                        className=" border-1 border-black w-[100%] h-9 rounded-lg pl-2.5"
                        name="email"
                        onChange={handlechange}
                        value={data.email} />
                    </div><div className='relative w-full'>
                        <label htmlFor="password">password</label>
                        <input
                          type={!togglePassword ? "password" : "text"}
                          placeholder="Enter your current password "
                          className=" border-1 border-black w-[100%] h-9 rounded-lg pl-2.5"
                          name="password"
                          onChange={handlechange}
                          value={data.password} />
                        {togglePassword ?
                          (<FaEye className="absolute top-9 right-8 cursor-pointer" onClick={() => settogglePassword(!togglePassword)} />) :
                          (<FaEyeSlash className="absolute top-9 right-8 cursor-pointer" onClick={() => settogglePassword(!togglePassword)} />)}
                      </div>
                      <div className="flex items-center justify-center">
                      <button type="submit" className="border-2 border-b-black rounded-lg bg-slate-500 w-[100%] h-[30px] mt-3 py-1.3 cursor-pointer"  >
                        Delete
                      </button>
                    </div>
                    <div className="mt-2 text-center">
                      <NavLink to="/user-profile" className="text-black font-semibold block bg-blue-800 w-[100%] h-[30px] py-1.3 border-b-black rounded-lg">Cancel</NavLink>
                      </div>
                      </form>
        </>):(<><header className="h-[110px] w-[100%] bg-gray-600 rounded-xl flex flex-col items-center">
          <img
            src={authUser?.photoURL}
            className="rounded-full h-28 w-28 -mt-20"
          />
          <h2>{authUser?.displayName}</h2>
          <h2>{authUser?.email}</h2>
          {/* {setisLoading(false)} */}
        </header>
        {user_profile ? (
          <div className="text-black mt-2">
            <h2 className="text-xl text-black">Personal Info:</h2>
            <article className="flex flex-wrap gap-2">
              <div className="w-[48%] bg-slate-500 px-4 py-2 rounded-lg">
                <h3>Phone Number:</h3>
                <p>{user_profile?.phoneNumber}</p>
              </div>
              <div className="w-[48%] bg-slate-500 px-4 py-2 rounded-lg">
                <h3>DOB:</h3>
                <p>{user_profile?.dateOfBirth}</p>
              </div>
              <div className="w-[48%] bg-slate-500 px-4 py-2 rounded-lg">
                <h3>Languages:</h3>
                <p>{user_profile?.languages}</p>
              </div>
              <div className="w-[48%] bg-slate-500 px-4 py-2 rounded-lg">
                <h3>Gender:</h3>
                <p>{user_profile?.gender}</p>
              </div>
              <div className="w-[98%] bg-slate-500 px-4 py-2 rounded-lg">
                <h3>Address:</h3>
                <p>{user_profile?.address}</p>
              </div>
            </article>
          </div>
        ) : (
          <>
            <div className="h-[150px] w-[100%] flex items-center justify-center flex-col gap-4 shrink-0">
              <h2 className="text-lg text-black">User data not present</h2>
              <NavLink
                to="/user-profile/update-profile"
                className="px-4 py-2 bg-blue-500 rounded-lg"
              >
                Add User
              </NavLink>
            </div>
          </>
        )}
        <button className="bg-blue-400 h-[30px] w-[60px] border-2 border-black rounded-lg mt-2 absolute right-[613px] cursor-pointer hover:bg-blue-600" onClick={handleDelete}>
          Delete
        </button></>)}
      </article>
      {/* {isLoading && <Spinner/>} */}
    </section>
  );
};

export default DeleteAccount;
