import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import './Layout.css';

function Layout() {
  return (
    <div className='stack-layout'>
      <div className='stack-layout-container'>
        <LeftSideBar/>
        <Dashboard/>
      </div>    
    </div>
  )
}

export default Layout