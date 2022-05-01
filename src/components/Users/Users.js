import React, {useState} from 'react';
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

function Users() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('activity')
  const user = {
    aboutMeText: 'about',
    answersCount: 12,
    bronzeCount: 123,
    goldCount: 54,
    lastSeen: 'this week',
    lengthOfTimeAsMember: '3 days',
    profileIconSrc: 'http://placekitten.com/200/300',
    reachedCount: 42,
    reputationCount: 123,
    questionsCount: 64,
    silverCount: 12,
    username: 'kfbustam',
  }
  const {
    lastSeen,
    lengthOfTimeAsMember,
    profileIconSrc,
    username,
    visitedDateInterval
  } = user

  const handleChange = (event, newValue) => {
    setTab(newValue);
  }

  return (
    <div style={rootStyle}>
      <div style={titleHeaderStyle}>    
        <IconButton key="profileIcon" onClick={() => navigate('/users')}>
          <Avatar src={profileIconSrc} style={{width: 160, height: 160}}/>
        </IconButton>
        <div style={{display: 'flex', flexDirection: 'column', margin: 'auto auto auto 0px'}}>
          <h2>
            {username}
          </h2>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <><Cake />Member for {lengthOfTimeAsMember}</>
            <><AccessTime />Last seen {lastSeen}</>
            <><CalendarMonth />Visited {visitedDateInterval}</>
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