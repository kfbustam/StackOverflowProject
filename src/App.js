import React from 'react';
import { useState, useEffect } from "react";
//import './App.css';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Navbar/Footer';
import CommentIcon from '@mui/icons-material/Comment';
import Login from './components/Login/Login';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import SignUp from './components/SignUp/SignUp';
import Questions from './components/Questions/Questions';
import Users from './components/Users/Users';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';
import CircleIcon from '@mui/icons-material/Circle';
import { Routes, Route } from 'react-router-dom';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Badge from '@mui/material/Badge';
import PostQuestion from './components/PostQuestion/PostQuestion'
import './components/Layout/Layout.css';

import Admin from './components/Admin/Admin';
import AddTag from './components/Admin/AddTag';
import Question from './components/Admin/Question';
import UserList from './components/Admin/UserList';
import QuestionsGraph from './components/Admin/QuestionsGraph';
import Quesgraph from './components/Admin/Quesgraph';
import QuestionOverview from './components/QuestionsOverview/QuestionOverview';
import Search from './components/Search/Search';
import AllUsers from './components/AllUsers/AllUsers'
import AllTags from './components/AllTags/AllTags'
import TagsOverview from './components/TagsOverview/TagsOverview';
import MyMessages from './components/MyMessages/MyMessages';

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

const getRightOfTheSearchBarLinkComponents = (navigate, user, logout) => {


  const profileIconSrc = 'http://placekitten.com/200/300';
  const achievementCount = 42;
  const messageCount = 5;
  const userGoldCount = 2;
  const userSilverCount = 2;
  const userBronzeCount = 2;
  // const isUserLoggedIn = true;

  if (!user) {
    return [
      <Button key="login" onClick={() => navigate('/login')} variant="outlined">Log in</Button>,
      <Button key="signup" onClick={() => navigate('/signup')} variant="contained">Sign up</Button>
    ];
  }

  const rightOfTheSearchBarLinkComponents = [
    <IconButton key="profileIcon" onClick={() => navigate('/users')} size="small">
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
    <Button key="logout" onClick={logout} variant="outlined">Logout</Button>
  )

  return rightOfTheSearchBarLinkComponents;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  let user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    //setUser(JSON.parse(localStorage.getItem('user')));
  }, [location]);

  const logout = () => {
    navigate('/');
    localStorage.clear();
    //setUser(null);
    user = null
  }

  // const isUserLoggedIn = true;

  const leftOfTheSearchBarLinkComponents = user ? 
    [
      <Button key="products" variant="text">Products</Button>,
    ] 
    : [
    <Button key="about" variant="text">About</Button>,
    <Button key="products" variant="text">Products</Button>,
    <Button key="teams" variant="text">For Teams</Button>
    ]
  ;

  const rightOfTheSearchBarLinkComponents = getRightOfTheSearchBarLinkComponents(navigate, user, logout);

  return (
    <>
      <Navbar
        leftOfTheSearchBarLinkComponents={leftOfTheSearchBarLinkComponents}
        rightOfTheSearchBarLinkComponents={rightOfTheSearchBarLinkComponents} 
      />
      <Routes>
        <Route path="/" element={   
          <div className='stack-layout'>
            <div className='stack-layout-container'>
              <LeftSideBar activeTab='home'/>
              <Questions/>
            </div>    
          </div>
        }/>
        <Route path="/questions" element={   
          <div className='stack-layout'>
            <div className='stack-layout-container'>
              <LeftSideBar activeTab='questions'/>
              <Questions/>
            </div>    
          </div>
        }/>
        <Route path="/tags" element={   
          <div className='stack-layout'>
            <div >
              <LeftSideBar activeTab='tags'/>
              <AllTags/>
            </div>    
          </div>
        }/>
        <Route path="/users" element={   
          <div className='stack-layout'>
            <div className='stack-layout-container'>
              <LeftSideBar activeTab='users'/>
              <Users />
            </div>    
          </div>
        }/>
        <Route path="/exploreCollectives" element={   
          <div className='stack-layout'>
            <div className='stack-layout-container'>
              <LeftSideBar activeTab='exploreCollectives'/>
            </div>    
          </div>
        }/>
        <Route exact path="/questions/overview" element={<QuestionOverview />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/askQuestion" element={<PostQuestion />} />
        <Route exact path="/myMessages" element={<MyMessages />} />

        <Route exact path="/admin" element={(user && user.email === 'admin@gmail.com') ? <Admin /> : <Navigate to='/' />} />
        <Route exact path="/addtag" element={(user && user.email === 'admin@gmail.com') ? <AddTag /> : <Navigate to='/' />} />
        <Route exact path="/question" element={(user && user.email === 'admin@gmail.com') ? <Question /> : <Navigate to='/' />} />
        <Route exact path="/userlist" element={(user && user.email === 'admin@gmail.com') ? <UserList /> : <Navigate to='/' />} />
        <Route exact path="/questionsgraph" element={(user && user.email === 'admin@gmail.com') ? <QuestionsGraph /> : <Navigate to='/' />} />
        <Route exact path="/quesgraph" element={(user && user.email === 'admin@gmail.com') ? <Quesgraph /> : <Navigate to='/' />} />

        <Route path="/search/:search_query" element={   
          <div className='stack-layout'>
            <div >
              <LeftSideBar activeTab='questions'/>
              <Search/>
            </div>    
          </div>
        }/>
        <Route path="/allUsers" element={   
          <div className='stack-layout'>
            <div >
              <LeftSideBar activeTab='users'/>
              <AllUsers/>
            </div>    
          </div>
        }/>
        <Route exact path="/questions/tagged/:tagName" element={   
          <div className='stack-layout'>
            <div >
              <LeftSideBar activeTab='questions'/>
              <TagsOverview/>
            </div>    
          </div>
        }/>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
