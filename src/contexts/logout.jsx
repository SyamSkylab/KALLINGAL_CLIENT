import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './authcontext.provider'

export const Logout = () => {
    const navigate = useNavigate()
    const { setUser, setToken } = useAuth()
    const handleLogOut = () => {

        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        setUser(null)
        setToken(null)
        navigate('/login')
    }

    return (<div><button onClick={() => handleLogOut()} className='text-white hover:text-amber-50'>LOGOUT</button></div>)
}
