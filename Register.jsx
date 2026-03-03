import React, { use, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth"
import { __AUTH } from "../backend/FirebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helpers/Spinner";


const Register = () => {
  let [togglePassword,settogglePassword]=useState(false)
  let [toggleconfirmPassword,settoggleconfirmPassword]=useState(false)
  let [isLoading,setisLoading]=useState(false)
  let navigate=useNavigate()

  let[data,setdata]=useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:""
  })

  let {username,email,password,confirmpassword}=data

  let handlechange=(e)=>{
    let value=e.target.value
    let key=e.target.name
    setdata({...data,[key]:value})
  }
  
  let handlesubmit=async (e)=>{
    e.preventDefault()
    // {data.confirmpassword==data.password?"":window.alert("password not matching")}
    try{
      setisLoading(true)
      if(password!==confirmpassword){
        toast.error("confirm password does not match")
        setdata({...data,confirmpassword:""})
      }else{
        let obj=await createUserWithEmailAndPassword(__AUTH,email,password)
        let {user}=obj
        await updateProfile(user,{
          displayName:username,
          photoURL:"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
        })
        sendEmailVerification(user)
        // toast()
        toast.success("user registered")
        toast("Verification link sent to email")
        navigate("/auth/login")
      }
    }
    catch(error){
      toast.error(error.message.slice(22,error.message.length-2))
    }
    finally{
        setisLoading(false)
    }
  }
  
  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-[#1D202A] flex justify-center items-center">
      <div className="w-[30%] bg-amber-100 p-4 rounded-lg">
        <header className="text-center text-2xl text-black">REGISTER</header>
        <main className="p-2">
          <form className="text-black flex flex-col gap-2" onSubmit={handlesubmit} >
            <div>
              <label htmlFor="Username">Username</label>
              <input
                type="text"
                placeholder="Enter name"
                className=" border-1 border-black w-[100%] h-9 rounded-lg pl-2.5"
                onChange={handlechange}
                name="username"
                value={username}
              />
            </div>
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
            <div className="relative">
              <label htmlFor="confrimpassword">Confirm Password</label>
              <input
                type={toggleconfirmPassword?"text":"password"}
                placeholder="confirm password"
                className=" border-1 border-black w-[100%] h-9 rounded-lg pl-2.5"
                onChange={handlechange}
                name="confirmpassword"
                value={confirmpassword}
              />
              
              {toggleconfirmPassword?
              (<FaEye className="absolute top-[35px] right-[15px] cursor-pointer" onClick={()=>settoggleconfirmPassword(!toggleconfirmPassword)}/>):
              (<FaEyeSlash className="absolute top-[35px] right-[15px] cursor-pointer" onClick={()=>settoggleconfirmPassword(!toggleconfirmPassword)}/>)}
              
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="border-2 border-b-black rounded-lg bg-slate-500 w-[100%] mt-3 py-1.3 cursor-pointer">
                REGISTER
              </button>
            </div>
            <div className="mt-2 text-center">
              <span>Already  have an account?</span>
              <NavLink to="/auth/login" className="text-black">Login</NavLink>
              </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner/>}
    </section>
  );
};

export default Register;
