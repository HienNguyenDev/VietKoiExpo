import React from 'react'
import { Outlet } from 'react-router-dom'

const ManageKoiEntries = () => {
  return (
    <div>
        <div className='contentManageKoiEntries'>
            <Outlet/>
        </div>
    </div>
  )
}

export default ManageKoiEntries