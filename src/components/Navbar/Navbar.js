import React from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return ( 
   <div className='navbar-container'>
     <div className='navbar-left'>
       <img onClick={() => navigate('/')} src="https://wizardsourcer.com/wp-content/uploads/2019/03/Stackoverflow.png" alt='logo'/>
       <Button variant="text">About</Button>
       <Button variant="text">Products</Button>
       <Button variant="text">For Teams</Button>       
     </div>
     <div className='navbar-mid'>
       <div className='navbar-search-container'>
         <SearchIcon/>
         <input type='text' placeholder='Search...' />
       </div>
     </div>
     <div className='navbar-right'>
     <div className='navbar-right-container'>
      <Button onClick={() => navigate('/login')} variant="outlined">Log in</Button> 
      <Button onClick={() => navigate('/signup')} variant="contained">Sign up</Button>
    </div>
     </div>

   </div>
    
  )
}

export default Navbar