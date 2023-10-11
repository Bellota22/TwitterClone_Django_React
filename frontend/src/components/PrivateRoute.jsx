import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


function PrivateRoute() {

    const user = localStorage.getItem('user_id')

  return (

    user? <Outlet /> : <Navigate to="/login" replace={true} />
)
}

export default PrivateRoute