// import React from 'react'
import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { __AUTH } from "../../backend/FirebaseConfig"; // Firebase config
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContextAPI } from '../../context/AuthContext';
import Spinner from '../../helpers/Spinner';

const UpdatePassword = () => { 
  let[isLoading,setisLoading]=useState(false)
  let[togglePassword,settogglePassword]=useState(false)
  let [toggleNewPassword, setToggleNewPassword] = useState(false);
  let [toggleNewconfrimPassword, setToggleNewconfrimPassword] = useState(false);
  let[data,setdata]=useState({
    email:"",
    password:"",
    newPassword:"",
    newconfirmPassword:""
  })
  let {authUser}=useContext(AuthContextAPI)
  const [isVerified, setIsVerified] = useState(false);
  let navigate= useNavigate()
  

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(__AUTH, data.email, data.password);
      toast.success("Password verified! You can now update your password.");
      setIsVerified(true);
    } catch (error) {
      toast.error("Incorrect password. Try again.");
    }
    finally{
      setisLoading(false)
    }
  };

  const handlesubmit=(e)=>{
      e.preventDefault();
      try{
        if(data.newPassword!== data.newconfirmPassword){
          toast.error("password mismatch")
        }
      const user =authUser
      
        if(user){
          updatePassword(user,data.newPassword)
          toast.success("Password changed")
          navigate('/auth/login')
        }
        else{
          toast.error("user not found,log-in again")
        }
      }
      catch(error){
            toast.error(error.message)
      }
      finally{
        setisLoading(false)
      }
  }
  const handlechange=(e)=>{
    let value=e.target.value
    let key=e.target.name
    setdata({...data,[key]:value})
  }

  return (
    <section className="h-[100%] w-[100%] bg-gray-400 flex justify-center items-center relative">
      <article className="h-[380px] w-[40%] bg-amber-100 rounded-xl p-4">
      <header className="text-center text-2xl text-black">Update Password</header>
        <main className="p-2">
          
            {!isVerified?(<><form className="text-black flex flex-col gap-2" onSubmit={handleVerify} >
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
              <button type="submit" className="border-2 border-b-black rounded-lg bg-slate-500 w-[100%] h-[30px] mt-3 py-1.3 cursor-pointer" >
                verify
              </button>
            </div>
            <div className="mt-2 text-center">
              <NavLink to="/user-profile" className="text-black font-semibold block bg-blue-800 w-[100%] h-[30px] py-1.3 border-b-black rounded-lg">Cancel</NavLink>
              </div>
              </form>
              
              </>):(
              <>
              <form className="text-black flex flex-col gap-2" onSubmit={handlesubmit}>
                <div className='relative w-full'>
                  <label htmlFor="newPassword"> Change password</label>
                  <input
                    type={!toggleNewPassword ? "password" : "text"}
                    placeholder="Enter your new password "
                    className=" border-1 border-black w-[100%] h-9 rounded-lg pl-2.5"
                    name="newPassword" 
                    onChange={handlechange}
                    value={data.newPassword}/>
                   
                  {toggleNewPassword ?
                    (<FaEye className="absolute top-9 right-8 cursor-pointer" onClick={() => setToggleNewPassword(!toggleNewPassword)} />) :
                    (<FaEyeSlash className="absolute top-9 right-8 cursor-pointer" onClick={() => setToggleNewPassword(!toggleNewPassword)} />)}
                </div><div className='relative w-full'>
                    <label htmlFor="newconfirmPassword"> Confirm password</label>
                    <input
                      type={!toggleNewconfrimPassword ? "password" : "text"}
                      placeholder="Enter your new password "
                      className=" border-1 border-black w-[100%] h-9 rounded-lg pl-2.5"
                      name="newconfirmPassword"
                      onChange={handlechange} 
                      value={data.newconfirmPassword}/>
                    {toggleNewconfrimPassword ?
                      (<FaEye className="absolute top-9 right-8 cursor-pointer" onClick={() => setToggleNewconfrimPassword(!toggleNewconfrimPassword)} />) :
                      (<FaEyeSlash className="absolute top-9 right-8 cursor-pointer" onClick={() => setToggleNewconfrimPassword(!toggleNewconfrimPassword)} />)}
                  </div>
                  <button type="submit" className="border-2 border-b-black rounded-lg bg-slate-500 w-[100%] h-[30px] mt-3 py-1.3 cursor-pointer" >
                Change
              </button>
                  </form>
                 </>
            )
            }
        </main>
      </article>
      {/* {isLoading && <Spinner/>} */}
    </section>
  )
}

export default UpdatePassword
