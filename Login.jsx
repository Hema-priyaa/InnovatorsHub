// import React from 'react'
import React,{ useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { __AUTH } from '../backend/FirebaseConfig';
import {signInWithEmailAndPassword , sendEmailVerification} from "firebase/auth"
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from '../helpers/Spinner';
import { AuthContextAPI } from '../context/AuthContext';

const Login = () => {
    let [togglePassword,settogglePassword]=useState(false)
    let [isLoading,setisLoading]=useState(false)
    let navigate=useNavigate();
    let {setauthUser}=useContext(AuthContextAPI)

  let[data,setdata]=useState({
    email:"",
    password:""
  })

  let {email,password}=data

  let handlechange=(e)=>{
    let value=e.target.value
    let key=e.target.name
    setdata({...data,[key]:value})
  }

  const handlesubmit=async(e)=>{
    e.preventDefault()
    try{
     let obj= await signInWithEmailAndPassword(__AUTH,email,password)
     let{user}=obj
     console.log(user)
     if(user.emailVerified === true){
      toast.success("Login successful")
      setauthUser(user)
      navigate("/")
     }else{
      toast.error("verify your email")
      sendEmailVerification(user)
     }
    }
    catch(error){
      toast.error(error.message)
    }
    finally{
      setisLoading(false)
    }
  }
  
  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-[#1D202A] flex justify-center items-center">
      <div className="w-[30%] bg-amber-100 p-4 rounded-lg">
        <header className="text-center text-2xl text-black">Login</header>
        <main className="p-2">
          <form className="text-black flex flex-col gap-2" onSubmit={handlesubmit} >
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className=" border-1 border-black w-[100%] h-9 rounded-lg pl-2.5"
                onChange={handlechange}
                name="email"
                value={email}
              />
            </div>
            <div className="relative">
              <label htmlFor="password">Password</label>
              <input
                type={togglePassword?"text":"password"}
                placeholder="Enter password"
                className=" border-1 border-black w-[100%] h-9 rounded-lg pl-2.5"
                onChange={handlechange}
                name="password"
                value={password}
              />
              {togglePassword?
              (<FaEye className="absolute top-[35px] right-[15px] cursor-pointer" onClick={()=>settogglePassword(!togglePassword)}/>):
              (<FaEyeSlash className="absolute top-[35px] right-[15px] cursor-pointer" onClick={()=>settogglePassword(!togglePassword)}/>)}
 
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="border-2 border-b-black rounded-lg bg-slate-500 w-[100%] mt-3 py-1.3 cursor-pointer">
                Login
              </button>
            </div>
            <div className="mt-2 text-center">
              <span>Don't  have an account?</span>
              <NavLink to="/auth/register" className="text-black">Register</NavLink>
              </div>
              <div className='mt-1 text-center'><NavLink to="/auth/forget-password">Forget Password?</NavLink></div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default Login
