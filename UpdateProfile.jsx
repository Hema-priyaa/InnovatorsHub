import React, { useContext, useState } from "react";
import { AuthContextAPI } from "../../context/AuthContext";
import { __DB } from "../../backend/FirebaseConfig";
import { doc,setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { UserContextAPI } from "../../context/UserContext";

const UpdateProfile = () => {

  let{authUser}=useContext(AuthContextAPI)
  // console.log(authUser.uid);
  let{user_profile}=useContext(UserContextAPI)

  

  let[data,setData]=useState({
    phoneno:user_profile?.phoneNumber,
    dob:user_profile?.dateOfBirth,
    languages:user_profile?.languages,
    gender:user_profile?.gender,
    address:user_profile?.address
  })

  let {phoneno,dob,languages,gender,address}=data
  let handlechange=(e)=>{
      let key=e.target.name
      let value=e.target.value
      setData({...data,[key]:value})
  }

  let handlesubmit=async(e)=>{
    e.preventDefault()
    let{displayName,email,photoURL,uid}=authUser
    let payload={
         name:displayName,
         email:email,
         photo:photoURL,
         uid:uid,
         phoneNumber:phoneno,
         dateOfBirth:dob,
         gender:gender,
         languages:languages,
         address:address,
         role:"user"
    };
    try{
      console.log(payload);
      
      let user_collection=doc(__DB,"user_profile",uid)
      await setDoc(user_collection,payload)
      toast.success("Details added")
    }catch(error){
      toast.error(error.message)
    }
    console.log(payload);

  }

  return (
    <section className="h-[100%] w-[100%] bg-gray-400 flex justify-center items-center relative">
      <article className="h-[380px] w-[40%] bg-amber-100 rounded-xl p-4">
        <h2 className="text-black text-center text-2xl">Update Profile Data</h2>
        <form className="mt-8 flex flex-col gap-2" onSubmit={handlesubmit}>
          <article className="flex gap-8">
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="Phoneno" className="text-black ">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneno"
                required
                placeholder="Enter Phone Number"
                className="border-black border-2 placeholder-black w-[100%] h-9 rounded-lg px-3 text-black"
                name="phoneno" value={phoneno} onChange={handlechange}
              />
            </div>

            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="dob" className="text-black ">
                Date Of Birth:
              </label>
              <input
                type="date"
                id="dob"
                required
                className="border-black border-2 text-black w-[100%] h-9 rounded-lg px-3"
                name="dob" value={dob} onChange={handlechange}
              />
            </div>
          </article>

          <article className="flex gap-8">
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="languages" className="text-black ">
                Languages:
              </label>
              <input
                type="text"
                id="languages"
                required 
                placeholder="Enter Languages"
                className="border-black border-2 placeholder-black w-[100%] h-9 rounded-lg px-3 text-black"
                name="languages" value={languages} onChange={handlechange}
              />
            </div>

            <div className="flex flex-col gap-2 w-[48%]">
              <label className="text-black" required>Gender:</label>
              <div className="flex gap-2  mt-1">
                <input type="radio" onChange={handlechange} name="gender" value="male" checked={gender=="male"}/>
                <span className="text-black">Male</span>
                <input type="radio" onChange={handlechange} name="gender" value="female" checked={gender=="female"}/>
                <span className="text-black">Female</span>
                <input type="radio" onChange={handlechange} name="gender" value="others" checked={gender=="others"}/>
                <span className="text-black">Others</span>
              </div>
            </div>
          </article>
          <div>
            <label htmlFor="address" className="text-black">Address:</label>
            <textarea placeholder="Enter address" className="border-black border-2 placeholder-black w-[100%] rounded-lg px-3 py-2 text-black" required onChange={handlechange} name="address" value={address}/>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="text-black border-black border-2 bg-blue-300 rounded-lg w-[100%] h-[30px] cursor-pointer">Submit</button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default UpdateProfile;


// update password and delete account
