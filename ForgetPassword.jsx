// import React from 'react'
import React, { useState } from 'react'
import Spinner from '../helpers/Spinner'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { sendPasswordResetEmail } from 'firebase/auth'
import { __AUTH } from '../backend/FirebaseConfig'

const ForgetPassword = () => {
    let[email,setEmail]=useState("")
    let [isLoading,setisLoading]=useState(false)
    const navigate=useNavigate()


    const handlechange=(e)=>{
        setEmail(e.target.value)
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            await sendPasswordResetEmail(__AUTH,email)
            toast.success("Reset link sent to mail")
            navigate("/auth/login")
        }
        catch{
            toast.success(error.message)
        }
        finally{
            setisLoading(false)
        }
        
    }
  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-[#1D202A] flex justify-center items-center">
      <div className="w-[30%] bg-amber-100 p-4 rounded-lg">
        <header className="text-center text-2xl text-black">RESET PASSWORD</header>
        <main className="p-2">
          <form className="text-black flex flex-col gap-2" onSubmit={handleSubmit} >
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
            
            <div className="flex items-center justify-center">
              <button type="submit" className="border-2 border-b-black rounded-lg bg-slate-500 w-[100%] mt-3 py-1.3 cursor-pointer">
                Reset Password
              </button>
            </div>
            <div className="mt-2 text-center">
              {/* <span>Don't  have an account?</span> */}
              <NavLink to="/auth/register" className="text-black block bg-blue-800 border-b-black rounded-lg">Cancel</NavLink>
              </div>
              {/* <div className='mt-1 text-center'><NavLink to="/auth/forget-password">Forget Password?</NavLink></div> */}
          </form>
        </main>
      </div>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default ForgetPassword
