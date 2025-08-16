import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user")
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.log("Error Passing Data : ", error);
      return null;
    }
  })

  const [token, setToken] = useState(() => localStorage.getItem("token") || null)

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    setToken(null);
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
    )
}