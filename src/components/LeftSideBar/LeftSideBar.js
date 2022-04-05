import React from 'react';
import PublicIcon from '@material-ui/icons/Public';
import StarsIcon from '@mui/icons-material/Stars';
import {Link} from  'react-router-dom';
import './LeftSideBar.css';

function LeftSideBar() {
  return (
    <div  className='left-sidebar'>
      <div className='left-sidebar-container'>
        <div className='left-sidebar-options'>
          <div className='left-sidebar-option'>
            <Link>Home</Link>            
            <p>PUBLIC</p>   
             <div className='link'>
              <div className='link-tag'>
                <PublicIcon/>
                <Link>Questions</Link>
               </div> 
              <div className='tags'>                
                <Link>Tags</Link> 
                <Link>Users</Link>
              </div>                 
            </div>  
          </div>
          <div className='left-sidebar-option'>       
            <p>COLLECTIVES</p>   
            <div className='link'>
              <div className='link-tag'>
                <StarsIcon/>
                <Link>Explore Collectives</Link>
              </div>                               
            </div>  
          </div>
        </div>
      </div>
    </div>    
  )}

export default LeftSideBar