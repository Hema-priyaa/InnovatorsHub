import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import { UserContextAPI } from '../../context/UserContext'
import Spinner from '../../helpers/Spinner'

const UserAccount = () => {
  let {authUser}=useContext(AuthContextAPI)
  let {user_profile}=useContext(UserContextAPI)
  // let [profile,setProfile]=useState(null)
  let [isLoading,setisLoading]=useState(true)
  
     
  return (
    <section className='h-[100%] w-[100%] bg-gray-400 flex justify-center items-center relative'>
      <article className='min-h-[300px] w-[40%] bg-amber-100 rounded-xl p-4'> 
        <header className='h-[110px] w-[100%] bg-gray-600 rounded-xl flex flex-col items-center'>
          <img src={authUser?.photoURL} className='rounded-full h-28 w-28 -mt-20'/>
          <h2>{authUser?.displayName}</h2>
          <h2>{authUser?.email}</h2>
          {/* {setisLoading(false)} */}
        </header>
        {user_profile? (
        <div className='text-black mt-2'>
          <h2 className='text-xl text-black'>Personal Info:</h2>
          <article className='flex flex-wrap gap-2'>
            <div className='w-[48%] bg-slate-500 px-4 py-2 rounded-lg'>
              <h3>Phone Number:</h3>
              <p>{user_profile?.phoneNumber}</p>
            </div>
            <div className='w-[48%] bg-slate-500 px-4 py-2 rounded-lg'>
              <h3>DOB:</h3>
              <p>{user_profile?.dateOfBirth}</p>
            </div>
            <div className='w-[48%] bg-slate-500 px-4 py-2 rounded-lg'>
              <h3>Languages:</h3>
              <p>{user_profile?.languages}</p>
            </div>
            <div className='w-[48%] bg-slate-500 px-4 py-2 rounded-lg'>
              <h3>Gender:</h3>
              <p>{user_profile?.gender}</p>
            </div>
            <div className='w-[98%] bg-slate-500 px-4 py-2 rounded-lg'>
              <h3>Address:</h3>
              <p>{user_profile?.address}</p>
            </div>
          </article>
        </div>): (<>
        <div className='h-[150px] w-[100%] flex items-center justify-center flex-col gap-4 shrink-0' >
          <h2 className='text-lg text-black'>User data not present</h2>
          <NavLink to='/user-profile/update-profile' className="px-4 py-2 bg-blue-500 rounded-lg">Add User</NavLink>
        </div></>)}
      </article>
      {/* {isLoading && <Spinner/>} */}
    </section>
  )
}

export default UserAccount
