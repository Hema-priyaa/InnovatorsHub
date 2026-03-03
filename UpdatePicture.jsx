import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContextAPI } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../../helpers/Spinner";

const UpdatePicture = () => {
  let [picture, setPicture] = useState(null);
  let [preview, setPreview] = useState(null);
  let [isLoading,setisLoading]=useState(false)
  let {authUser}=useContext(AuthContextAPI)
  let navigate= useNavigate()

  const handlechange = (e) => {
    // console.dir(e.target.files[0]);
    let file = e.target.files[0];
    // console.log(file);
    setPicture(file);

    if (file) {
      let url = URL.createObjectURL(file);
      console.log(url);
      setPreview(url);
    }
  };

  const handlesubmit = async(e) => {
    e.preventDefault();
    try{
      setisLoading(true)
    if(!picture){
      toast.error("select a photo")
      return ;
    }
    else{
      const data=new FormData()
      data.append("file",picture)
      data.append("upload_preset","Innovators hub music")

      let response=await fetch("https://api.cloudinary.com/v1_1/dvajm4oof/image/upload",{
        method:"POST",
        body:data
      });
      let result= await response.json();
      console.log(result);
      
      await updateProfile(authUser,{
        photoURL:result.url
    })
      toast.success("picture updated")
      
      navigate("/user-profile")
    }}
    catch(error){
      toast.error(error.message)
    }
    finally{
       setisLoading(false)
    }
  };

  return (
    <section className="h-[100%] w-[100%] bg-gray-400 flex justify-center items-center relative">
      <article className="h-[350px] w-[40%] bg-amber-100 rounded-xl p-4">
        <h2 className="text-black text-center text-2xl pb-2">
          Upload Profile Picture
        </h2>
        {preview ? (
          <div className="m-auto h-32 w-32 rounded-full">
            <img
              src={preview}
              className="h-32 w-32  border-black border-2 rounded-full text-2xl"
            />
          </div>
        ) : (
          <div className="m-auto h-32 w-32 rounded-full text-black bg-[#E0C6CB] flex items-center justify-center border-black border-2">
            <img src={authUser.photoURL} className="h-32 w-32 rounded-full"/>
          </div>
        )}
        <form className="flex flex-col gap-3 mt-3" onSubmit={handlesubmit}>
          <label
            htmlFor="picture"
            className="text-black block py-3 w-[100%] text-center bg-slate-300 border-black border-dotted border-2 rounded-lg cursor-pointer  hover:bg-slate-500"
            accept="image/*"
          >
            Select a Photo
          </label>
          <input
            type="file"
            id="picture"
            className="hidden"
            onChange={handlechange}
            name="picture"
          />
          <button
            className="text-black block py-3 w-[100%] text-center bg-blue-600 border-black border-solid border-2 rounded-lg cursor-pointer hover:bg-blue-800"
          >
            Upload a Photo
          </button>
          <input type="file" id="picture" className="hidden" />
        </form>
      </article>
      {isLoading && <Spinner/>}
    </section>
  );
};

export default UpdatePicture;
