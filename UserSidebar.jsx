import React from "react";
import { NavLink } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoMdKey } from "react-icons/io";
import { IoIosCamera } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdDelete } from "react-icons/md";



const UserSidebar = () => {
  return (
    <div className="h-[100%] w-[20%]  bg-slate-800 px-4 py-8">
      
      <ul className="py-1 px-3.5 flex flex-col gap-2">
        <li className="w-ful">
        <NavLink
        end
        to="/user-profile"
        className={({ isActive }) =>
          `py-2.5 px-6 pl-3 w-[100%] rounded-lg hover:bg-slate-400 flex items-center ${
            isActive && "bg-slate-500"  
          }`
        }
      ><span className="pr-2 text-2xl"><RiAccountCircleFill /></span>
        <span className="py-1">My Account</span>
      </NavLink>
          
        </li>
        <li>
          <NavLink to="/user-profile/update-password" className={({ isActive }) =>
          ` py-2.5 px-6 pl-3 w-[100%] rounded-lg flex items-center hover:bg-slate-400 ${
            isActive ? "bg-slate-500"  :""
          }`
        }>
          <span className="pr-2 text-2xl"><IoMdKey /></span>
          <span className="py-1">Update Password</span>
          </NavLink>
        </li>
        <li >
          <NavLink to="/user-profile/update-picture" className={({ isActive }) =>
          ` py-2.5 px-6 pl-3 w-[100%] rounded-lg flex hover:bg-slate-400 ${
            isActive && "bg-slate-500"  
          }`
        }>
          <span className="pr-2 py-1 text-2xl"><IoIosCamera /></span>
          <span className="py-1">Update Picture</span>

        </NavLink>
        </li>
        <li >
          <NavLink to="/user-profile/update-profile" className={({ isActive }) =>
          ` py-2.5 px-6 pl-3 w-[100%] rounded-lg flex hover:bg-slate-400 ${
            isActive && "bg-slate-500"  
          }`
        }>
           <span className="pr-2 pt-1 text-2xl"> <MdOutlineManageAccounts/></span>
          <span>Update Profile</span>
          </NavLink>
        </li>
        <li >
          <NavLink to="/user-profile/delete-account" className={({ isActive }) =>
          ` py-2.5 px-6 pl-3 w-[100%] rounded-lg flex hover:bg-slate-400 ${
            isActive && "bg-slate-500"  
          }`
        }>
           <span className="pr-2 pt-1 text-2xl"> <MdDelete /></span>
          <span>Delete Account</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;

