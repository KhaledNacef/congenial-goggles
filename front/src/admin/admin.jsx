import React, { useState } from 'react'
import Sidebar from './component/sidebar.jsx';
import UserTable from './component/users.jsx';
import Profile from './component/Profile.jsx';
import Dashboard from './component/dashboard.jsx';
const Admin = () => {

  const[vie,setVie]=useState('dashbored')
  const changevie=(name)=>{
    setVie(name)
  }

  return (
    <div style={{ display: 'flex',height:'100vh',backgroundColor:'rgba(0, 0, 0, 0.1)',paddin:10}}>

      <Sidebar changevie={changevie} />
        {vie === 'user' ?<UserTable/>:null }
        {vie === 'profile' ? <Profile/>:null}
        {vie === 'dashboard' ? <Dashboard/>:null}
    </div>
  )
}

export default Admin