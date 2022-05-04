import React from 'react';
import PublicIcon from '@material-ui/icons/Public';
import StarsIcon from '@mui/icons-material/Stars';
import Box from '@mui/material/Box';
import { Link } from  'react-router-dom';
import './LeftSideBar.css';

function LeftSideBar({activeTab}) {
  return (
    <div  className='left-sidebar'>
      <div className='left-sidebar-container'>
        <div className='left-sidebar-options'>
          <div className='left-sidebar-option'>
            <div className='link'>
              <div className='link-tag' style={activeTab === 'home' ? {borderRight: '4px solid #F48024'} : {}}>
                <Link className='link-text' to="/">Home</Link>
              </div>
            </div>
            <p>PUBLIC</p>   
            <div className='link'>
              <div className='link-tag'>
                <PublicIcon/>
                <Link className='link-text' to="/questions" style={activeTab === 'questions' ? {borderRight: '4px solid #F48024'} : {}}>Questions</Link>
               </div> 
              <div className='tags'>                
                <Link className='link-tag link-text' to="/tags" style={activeTab === 'tags' ? {borderRight: '4px solid #F48024'} : {}}>Tags</Link> 
                <Link className='link-tag link-text' to="/users" style={activeTab === 'users' ? {borderRight: '4px solid #F48024'} : {}}>Users</Link>
              </div>
            </div>
          </div>
          <div className='left-sidebar-option'>
            <p>COLLECTIVES</p>   
            <div className='link'>
              <div className='link-tag'>
                <StarsIcon/>
                <Link className='link-text' to="/exploreCollectives" style={activeTab === 'exploreCollectives' ? {borderRight: '4px solid #F48024'} : {}}>Explore Collectives</Link>
              </div>                               
            </div>  
          </div>
        </div>
        <Box sx={{ borderRight: 1 }}></Box>
      </div>
    </div>    
  )}

export default LeftSideBar