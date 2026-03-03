import React from 'react'
import { AuthContextAPI } from '../context/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = (props) => {
    let {authUser}=useContext(AuthContextAPI)

    if(!authUser){
        return <Navigate to="/auth/login"/>
    }else{
        return props.children
    }
}

export default ProtectedRoutes
