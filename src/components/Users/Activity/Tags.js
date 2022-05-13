import React, { useEffect, useState } from 'react';
import axios from "axios";
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
  const [tcount, setTagCount] = useState(0)

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
      const response = await axios.get(`${API_URL}/api/user/getTagsTab/` + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) )
      const tagData = response.data.user
      setTagCount(response.data.user.length)
      setTags(tagData)
    }
    fetchTags()
  }, [])

  return (
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>{tcount} Tag(s)</h3>
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
              tagId
            } = tag
            return (
              <>
                <ListItem style={tagListItemStyle}>
                  <div>
                    <div className='search-tag-block me-1' onClick={()=>{
                      const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
                      navigate(`/search/[${name}]%20user:${userID}`)
                    }}>{name}</div>
                    {isGold && <IconButton key="gold" size="small"><CircleIcon style={goldCircleIconStyle} /></IconButton>}
                    {isSilver && <IconButton key="silver" size="small"><CircleIcon style={silverCircleIconStyle} /></IconButton>}
                    {isBronze && <IconButton key="bronze" size="small"><CircleIcon style={bronzeCircleIconStyle} /></IconButton>}
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