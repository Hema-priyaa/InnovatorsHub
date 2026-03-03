import React from 'react'
import { NavLink} from 'react-router-dom'
import { PiMusicNotesPlus } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";



const AdminSidebar = () => {
  return (
    <div className="h-[calc(100vh-70px)]  bg-slate-800 px-8 py-8 sticky top-[70px]  w-[20%] shrink-0">
      
    <ul className="py-1 px-3.5 flex flex-col gap-2">
      <li className="w-ful">
      <NavLink
      end
      to="/admin"
      className={({ isActive }) =>
        `py-2.5 px-6 pl-3 w-[100%] rounded-lg hover:bg-slate-400 flex items-center text-xl ${
          isActive && "bg-slate-500"  
        }`
      }
    ><span className="pr-2 text-2xl"><CiBoxList /></span>
      <span className="py-1">Dashboard</span>
    </NavLink>
        
      </li>
      <li>
        <NavLink to="/admin/add-album" className={({ isActive }) =>
        ` py-2.5 px-6 pl-3 w-[100%] rounded-lg flex items-center hover:bg-slate-400 text-xl ${
          isActive ? "bg-slate-500"  :""
        }`
      }>
        <span className="pr-2 text-2xl"><PiMusicNotesPlus /></span>
        <span className="py-1">Add Album</span>
        </NavLink>
      </li>
      {/* <li >
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
      </li> */}
    </ul>
  </div>
  )
}

export default AdminSidebar
