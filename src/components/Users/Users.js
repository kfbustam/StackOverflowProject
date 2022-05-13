import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Cake from '@mui/icons-material/Cake';
import AccessTime from '@mui/icons-material/AccessTime';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Profile from './Profile';
import Activity from './Activity';
import defaultimg from '../../default/default.png';
import API_URL from '../../apiConfig'



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
  const [profileimage, setimgData] = useState(null)
  let { paramid } = useParams();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  }

  useEffect(() => {
    async function fetchInfo() {
      const response = await axios.get(`${API_URL}/api/user/getBasicDetails/` + paramid )
      console.log(response)
      setimgData(`${API_URL}/image/${response.data.user.profileURL}`)
      let {
        about,
        answerIds,
        bookmarks,
        comments,
        createdAt,
        location,
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
        lastSeen,
        profileURL,
        _id
      } = response.data.user;
      
      setUserData({
        aboutMeText: about,
        answersCount: answerIds.length,
        lengthOfTimeAsMember: new Date(createdAt).toLocaleDateString("en-US", options),
        questionsCount: questionIds.length,
        reputationCount: reputation,
        lastSeen: new Date(updatedAt).toLocaleDateString("en-US", options),
        username,
        visitedDateInterval: new Date(updatedAt).toLocaleDateString("en-US", options),
        location:location
      })
    }
    fetchInfo()
  }, [paramid])

  return (
    <div style={rootStyle}>
      <div style={titleHeaderStyle}>    
        <IconButton key="profileIcon">
          <Avatar src={profileimage} style={{width: 160, height: 160}} />
        </IconButton>
        <div style={{display: 'flex', flexDirection: 'column', margin: 'auto auto auto 0px'}}>
          <h2>
            {userData?.username}
          </h2>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <><Cake />Member from {userData?.lengthOfTimeAsMember}</>
            <><AccessTime />Last seen {userData?.lastSeen}</>
            <><LocationOnIcon /> {userData?.location}</>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
         {JSON.parse(localStorage.getItem("user"))._id==paramid ?<Button key="askQuestion" onClick={() => navigate('/editProfile')} variant="contained" style={{height: 40}}>Edit profile</Button> :null}
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