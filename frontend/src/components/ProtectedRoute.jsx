import React, { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../api/AxiosInstance'
import { Navigate } from 'react-router-dom'
import { Children } from 'react'

const ProtectedRoute = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null)

    useEffect(()=>{
        const checkLogIn=async()=>{
        try{
            await axiosInstance.get("/auth/current-user")
            isLoggedIn(true)

        }catch(err){
            setIsLoggedIn(false)
            console.log(err)
        }
        }
        checkLogIn()
        
    },[])


    if (isLoggedIn === null){
        return <div>Loading ...</div>
    }

    if (!isLoggedIn){
        <Navigate to="/" replace />
    }

    return Children

    

}

export default ProtectedRoute
