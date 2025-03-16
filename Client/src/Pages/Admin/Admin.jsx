import React from 'react'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <Outlet /> {/* This will render nested components */}
    </div>
  )
}

export default Admin
