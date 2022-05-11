import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Cake from '@mui/icons-material/Cake';
import AccessTime from '@mui/icons-material/AccessTime';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import Profile from './Profile';
import Activity from './Activity';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '60%'
}

const titleHeaderStyle = {
  display: 'flex',
  flexDirection: 'row',
  margin: '20px 0px 0px 20px',
}

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

function Users() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('activity')
  const [userData, setUserData] = useState(null)
  // const user = {
  //   aboutMeText: 'about',
  //   answersCount: 12,
  //   bronzeCount: 123,
  //   goldCount: 54,
  //   lastSeen: 'this week',
  //   lengthOfTimeAsMember: '3 days',
  //   profileIconSrc: 'http://placekitten.com/200/300',
  //   reachedCount: 42,
  //   reputationCount: 123,
  //   questionsCount: 64,
  //   silverCount: 12,
  //   username: 'kfbustam',
  // }

  const handleChange = (event, newValue) => {
    setTab(newValue);
  }

  useEffect(() => {
    if (userData != null) return
    async function fetchInfo() {
      let user = JSON.parse(localStorage.getItem('user'))
      const response = await axios.get('http://localhost:3001/api/user/getBasicDetails/' + user._id )
      const {
        about,
        answerIds,
        bookmarks,
        comments,
        createdAt,
        downvote_given,
        downvotenum,
        email,
        history,
        memberFrom,
        questionIds,
        reputation,
        updatedAt,
        upvote_given,
        upvotenum,
        username,
      } = response.data.user;
      setUserData({
        aboutMeText: about,
        answersCount: answerIds.length,
        lengthOfTimeAsMember: new Date((new Date().getTime()) - (new Date(memberFrom).getTime())).toLocaleDateString("en-US", options),
        questionsCount: questionIds.length,
        reputationCount: reputation,
        lastSeen: new Date(updatedAt).toLocaleDateString("en-US", options),
        profileIconSrc: 'http://placekitten.com/200/300',
        username,
        visitedDateInterval: new Date(updatedAt).toLocaleDateString("en-US", options)
      })
    }
    fetchInfo()
  }, [userData])

  return (
    <div style={rootStyle}>
      <div style={titleHeaderStyle}>    
        <IconButton key="profileIcon" onClick={() => navigate('/users')}>
          <Avatar src={userData?.profileIconSrc} style={{width: 160, height: 160}}/>
        </IconButton>
        <div style={{display: 'flex', flexDirection: 'column', margin: 'auto auto auto 0px'}}>
          <h2>
            {userData?.username}
          </h2>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <><Cake />Member for {userData?.lengthOfTimeAsMember}</>
            <><AccessTime />Last seen {userData?.lastSeen}</>
            <><CalendarMonth />Visited {userData?.visitedDateInterval}</>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Button key="askQuestion" onClick={() => navigate('/askQuestion')} variant="contained" style={{height: 40}}>Edit profile</Button>
        </div>
      </div>
      <Tabs
        value={tab}
        onChange={handleChange}
        style={{margin: '0px 0px 0px 20px'}}
      >
        <Tab value="profile" label="Profile"/>
        <Tab value="activity" label="Activity" />
      </Tabs>
      { tab === 'profile' && <Profile /> }
      { tab === 'activity' && <Activity /> }
    </div>
  )
}

export default Users