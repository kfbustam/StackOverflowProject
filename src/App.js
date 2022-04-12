import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Navbar from './components/Navbar/Navbar';
import CommentIcon from '@mui/icons-material/Comment';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import SignUp from './components/SignUp/SignUp';
import CircleIcon from '@mui/icons-material/Circle';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Badge from '@mui/material/Badge';
import { red } from '@mui/material/colors';

const messageCountStyle = {
  color: '#525960',
  fontSize: 14,
  fontWeight: 700,
  padding: '0px 0px 0px 4px'
}

const bronzeCircleIconStyle = {
  color: 'brown',
  height: 12,
  margin: '0px 4px 0px 0px',
  width: 12
}

const bronzeCircleIconTextStyle = {
  color: 'brown',
}

const goldCircleIconStyle = {
  color: 'gold',
  height: 12,
  margin: '0px 4px 0px 0px',
  width: 12
}

const goldCircleIconTextStyle = {
  color: 'gold',
}

const silverCircleIconStyle = {
  color: 'silver',
  height: 12,
  margin: '0px 4px 0px 0px',
  width: 12
}

const silverCircleIconTextStyle = {
  color: 'silver',
}

const getRightOfTheSearchBarLinkComponents = (navigate) => {
  const profileIconSrc = 'http://placekitten.com/200/300';
  const achievementCount = 42;
  const messageCount = 5;
  const userGoldCount = 2;
  const userSilverCount = 2;
  const userBronzeCount = 2;
  const isUserLoggedIn = true;

  if (!isUserLoggedIn) {
    return [
      <Button key="login" onClick={() => navigate('/login')} variant="outlined">Log in</Button>,
      <Button key="signup" onClick={() => navigate('/signup')} variant="contained">Sign up</Button>
    ];
  }

  const rightOfTheSearchBarLinkComponents = [
    <IconButton key="profileIcon" onClick={() => navigate('/profile')} size="small">
      <Avatar src={profileIconSrc}/>
      <span style={messageCountStyle}>{messageCount}</span>
    </IconButton>,
  ];

  if (userGoldCount > 0) {
    rightOfTheSearchBarLinkComponents.push(<IconButton key="gold" onClick={() => navigate('/gold')} size="small"><CircleIcon style={goldCircleIconStyle}/><span style={goldCircleIconTextStyle}>{userGoldCount}</span></IconButton>)
  }
  if (userSilverCount > 0) {
    rightOfTheSearchBarLinkComponents.push(<IconButton key="silver" onClick={() => navigate('/silver')} size="small"><CircleIcon style={silverCircleIconStyle} /><span style={silverCircleIconTextStyle}>{userSilverCount}</span></IconButton>)
  }
  if (userBronzeCount > 0) {
    rightOfTheSearchBarLinkComponents.push(<IconButton key="bronze" onClick={() => navigate('/bronze')} size="small"><CircleIcon style={bronzeCircleIconStyle}/><span style={bronzeCircleIconTextStyle}>{userBronzeCount}</span></IconButton>)
  }

  rightOfTheSearchBarLinkComponents.push(
    <IconButton key="inbox" onClick={() => navigate('/inbox')} size="small" ><Badge badgeContent={messageCount} color="primary"><InboxIcon color="#525960" /></Badge></IconButton>,
    <IconButton key="achievements" onClick={() => navigate('/achievements')} size="small"><Badge badgeContent={achievementCount} color="success"><EmojiEventsIcon color="#525960" /></Badge></IconButton>,
    <IconButton key="help" onClick={() => navigate('/help')} size="small"><HelpIcon color="#525960" /></IconButton>,
    <IconButton key="community" onClick={() => navigate('/community')} size="small"><CommentIcon color="#525960" /></IconButton>,
  )

  return rightOfTheSearchBarLinkComponents;
}

function App() {
  const navigate = useNavigate()

  const isUserLoggedIn = true;


  const leftOfTheSearchBarLinkComponents = isUserLoggedIn ? 
    [
      <Button key="products" variant="text">Products</Button>,
    ] 
    : [
    <Button key="about" variant="text">About</Button>,
    <Button key="products" variant="text">Products</Button>,
    <Button key="teams" variant="text">For Teams</Button>
    ]
  ;

  const rightOfTheSearchBarLinkComponents = getRightOfTheSearchBarLinkComponents(navigate);

  return (
    <>
      <Navbar
        leftOfTheSearchBarLinkComponents={leftOfTheSearchBarLinkComponents}
        rightOfTheSearchBarLinkComponents={rightOfTheSearchBarLinkComponents} 
      />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;