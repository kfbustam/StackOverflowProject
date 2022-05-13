import React, { useEffect, useState } from 'react';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import API_URL from '../../../apiConfig';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
}

const badgeGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  columnGap: 10,
  rowGap: 15,
}

const goldCircleIconStyle = {
  color: 'gold',
  height: 12,
  margin: '0px 4px 0px 0px',
  width: 12
}

const bronzeCircleIconStyle = {
  color: 'brown',
  height: 12,
  margin: '0px 4px 0px 0px',
  width: 12
}

const silverCircleIconStyle = {
  color: 'silver',
  height: 12,
  margin: '0px 4px 0px 0px',
  width: 12
}

function Badges() {
  const navigate = useNavigate()
  const [bcount, setBadgeCount] = useState(0)
  const [badges, setBadges] = useState([])
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
    answersCount,
  } = user



  useEffect(() => {
    if (badges.length > 0) return
    async function fetchAnswers() {
      const response = await axios.get(`${API_URL}/api/user/getAllBadges/` + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) )
      const badgeData = response.data.badges
      setBadgeCount(response.data.badges.length)
      setBadges(badgeData)
    }
  fetchAnswers()
  }, [])

  return (
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>{bcount} Badge(s)</h3>
      </div>
      <div style={badgeGridStyle}>
        {badges.length > 0 && 
          badges.map((tag) => {
            const {
              type,
              badgeName,
              url
            } = tag
            return (
              <div key={badgeName}>
                {type === 'Gold' && <IconButton key="gold" size="small"><CircleIcon style={goldCircleIconStyle} /></IconButton>}
                {type === 'Silver' && <IconButton key="silver" size="small"><CircleIcon style={silverCircleIconStyle} /></IconButton>}
                {type === 'Bronze' && <IconButton key="bronze" size="small"><CircleIcon style={bronzeCircleIconStyle} /></IconButton>}
                <a className='search-tag-block me-1' href={url}>{badgeName}</a>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default Badges