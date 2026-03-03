import React from 'react'
import { UserContextAPI } from '../context/UserContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'


const AdminRoutes = (props) => {
    let {user_profile}=useContext(UserContextAPI)

    if(user_profile?.role === "admin"){
        return props.children
    }else{
        return <Navigate to="/"/>
    }
}

export default AdminRoutes
