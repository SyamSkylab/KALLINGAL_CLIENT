import React, { createContext, useContext, useState } from 'react'
const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')))
    const [access_token, setToken] = useState(() => localStorage.getItem('access_token'))
    return (
        <AuthContext.Provider value={{ user, setUser, access_token, setToken }}>{children}</AuthContext.Provider >
    )
}

export const useAuth = () => useContext(AuthContext)