import React from 'react';
import './Navbar.css';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom'

function Navbar({leftOfTheSearchBarLinkComponents, rightOfTheSearchBarLinkComponents}) {
  const navigate = useNavigate()

  return ( 
    <div className='navbar-container'>
      <div className='navbar-left'>
        <img onClick={() => navigate('/')} src="https://wizardsourcer.com/wp-content/uploads/2019/03/Stackoverflow.png" alt='logo'/>
        {leftOfTheSearchBarLinkComponents}
      </div>
      <div className='navbar-mid'>
        <div className='navbar-search-container'>
          <SearchIcon/>
          <input type='text' placeholder='Search...' />
        </div>
      </div>
      <div className='navbar-right'>
        <div className='navbar-right-container'>
          {rightOfTheSearchBarLinkComponents}
        </div>
      </div>
    </div>
  );
}

export default Navbar