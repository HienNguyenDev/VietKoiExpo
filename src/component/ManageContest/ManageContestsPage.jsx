import React from 'react'
import { Outlet } from 'react-router-dom'

const ManageContestsPage = () => {
  return (
    <div style={{height:'100vh'}}>
      <Outlet/>
    </div>
  )
}

export default ManageContestsPage