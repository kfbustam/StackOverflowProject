import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import API_URL from '../../../apiConfig';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const countStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: 10
}

const tagListItemStyle = {
  display: 'flex',
  flexDirection: 'row',
  height: 150,
  justifyContent: 'space-between',
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

function Tags() {
  const [tags, setTags] = useState([])
  // [
  //   {
  //     isBronze: false,
  //     isSilver: false,
  //     isGold: true,
  //     name: 'javascript',
  //     postCount: 1250,
  //     scoreCount: 2040,
  //     url: 'https://stackoverflow.com/questions/tagged/javascript'
  //   },
  //   {
  //     isBronze: false,
  //     isSilver: false,
  //     isGold: true,
  //     name: 'python',
  //     postCount: 1250,
  //     scoreCount: 2040,
  //     url: 'https://stackoverflow.com/questions/tagged/javascript'
  //   },
  //   {
  //     isBronze: false,
  //     isSilver: false,
  //     isGold: true,
  //     name: 'pandas',
  //     postCount: 1250,
  //     scoreCount: 2040,
  //     url: 'https://stackoverflow.com/questions/tagged/javascript'
  //   }
  // ]

  const navigate = useNavigate()
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
    if (tags.length > 0) return
    async function fetchTags() {
      let user = JSON.parse(localStorage.getItem('user'))
      const response = await axios.get(`${API_URL}/api/user/getTagsTab/` + user._id )
      const tagData = response.data.user
      console.log(tagData);
      setTags(tagData)
    }
    fetchTags()
  }, [])

  return (
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>{answersCount} Tags</h3>
        <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle}>
            <Button>Score</Button>
            <Button>Name</Button>
          </ButtonGroup>
        </div>
      </div>
      <List>
        {
          tags.map((tag) => {
            const {
              isBronze,
              isGold,
              isSilver,
              name,
              postCount,
              scoreCount,
              url
            } = tag
            return (
              <>
                <ListItem style={tagListItemStyle}>
                  <div>
                    <a className='search-tag-block me-1' href={url}>{name}</a>
                    {isGold && <IconButton key="gold" onClick={() => navigate('/gold')} size="small"><CircleIcon style={goldCircleIconStyle} /></IconButton>}
                    {isSilver && <IconButton key="silver" onClick={() => navigate('/silver')} size="small"><CircleIcon style={silverCircleIconStyle} /></IconButton>}
                    {isBronze && <IconButton key="bronze" onClick={() => navigate('/bronze')} size="small"><CircleIcon style={bronzeCircleIconStyle} /></IconButton>}
                  </div>
                  <div style={countStyle}>
                    <div style={{display: 'flex', margin: 'auto 0px auto 0px', gap: 5}}>{scoreCount} <div style={{color: '#6A747C'}}>score</div></div>
                    <div style={{display: 'flex', margin: 'auto 0px auto 0px', gap: 5}}>{postCount} <div style={{color: '#6A747C'}}>posts</div></div>
                  </div>
                </ListItem>
                <Divider />
              </>
            );
          })
        }
      </List>
    </div>
  )
}

export default Tags