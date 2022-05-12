import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';

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

const filterButtonGroupStyle = {
  display: 'flex',
  margin: '15px 0px 15px 0px',
  justifyContent: 'end'
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

  // const tags = [
  //   {
  //     isBadge: true,
  //     isBronze: false,
  //     isSilver: false,
  //     isGold: true,
  //     name: 'javascript',
  //     postCount: 1250,
  //     scoreCount: 2040,
  //     url: 'https://stackoverflow.com/questions/tagged/javascript'
  //   },
  //   {
  //     isBadge: true,
  //     isBronze: false,
  //     isSilver: false,
  //     isGold: true,
  //     name: 'python',
  //     postCount: 1250,
  //     scoreCount: 2040,
  //     url: 'https://stackoverflow.com/questions/tagged/javascript'
  //   },
  //   {
  //     isBadge: true,
  //     isBronze: false,
  //     isSilver: false,
  //     isGold: true,
  //     name: 'pandas',
  //     postCount: 1250,
  //     scoreCount: 2040,
  //     url: 'https://stackoverflow.com/questions/tagged/javascript'
  //   },
  //   {
  //     isBadge: false,
  //     isBronze: false,
  //     isSilver: false,
  //     isGold: true,
  //     name: 'pandas',
  //     postCount: 1250,
  //     scoreCount: 2040,
  //     url: 'https://stackoverflow.com/questions/tagged/javascript'
  //   },
  //   {
  //     isBadge: false,
  //     isBronze: false,
  //     isSilver: false,
  //     isGold: true,
  //     name: 'pandas',
  //     postCount: 1250,
  //     scoreCount: 2040,
  //     url: 'https://stackoverflow.com/questions/tagged/javascript'
  //   },
  //   {
  //     isBadge: false,
  //     isBronze: false,
  //     isSilver: false,
  //     isGold: true,
  //     name: 'pandas',
  //     postCount: 1250,
  //     scoreCount: 2040,
  //     url: 'https://stackoverflow.com/questions/tagged/javascript'
  //   }
  // ]

  useEffect(() => {
    if (badges.length > 0) return
    async function fetchAnswers() {
      let user = JSON.parse(localStorage.getItem('user'))
      const response = await axios.get('http://localhost:3001/api/user/getAllBadges/' + user._id )
      const badgeData = response.data.tags
      setBadges(badgeData)
    }
  fetchAnswers()
  }, [])

  return (
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>{answersCount} Badges</h3>
        <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle}>
            <Button>Recent</Button>
            <Button>Class</Button>
            <Button>Name</Button>
          </ButtonGroup>
        </div>
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
                {type === 'Gold' && <IconButton key="gold" onClick={() => navigate('/gold')} size="small"><CircleIcon style={goldCircleIconStyle} /></IconButton>}
                {type === 'Silver' && <IconButton key="silver" onClick={() => navigate('/silver')} size="small"><CircleIcon style={silverCircleIconStyle} /></IconButton>}
                {type === 'Bronze' && <IconButton key="bronze" onClick={() => navigate('/bronze')} size="small"><CircleIcon style={bronzeCircleIconStyle} /></IconButton>}
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