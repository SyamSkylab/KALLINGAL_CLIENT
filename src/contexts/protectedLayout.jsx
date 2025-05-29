import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedLayout = () => {
    const location = useLocation()
    const access_token = localStorage.getItem('access_token')
    const publicRoutes = ['/login', '/reg']
    if (publicRoutes.includes(location.pathname)) {
        return <Outlet />
    }
    if (!access_token) {
        <Navigate to={'/login'}></Navigate>
    }
    return <Outlet />
}
