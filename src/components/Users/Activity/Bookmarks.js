import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Check from '@mui/icons-material/Check';
import API_URL from '../../../apiConfig';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const postListItem = {
  display: 'flex',
  flexDirection: 'column',
  height: 150,
}

const filterButtonGroupStyle = {
  display: 'flex',
  margin: '15px 0px 15px 0px',
  justifyContent: 'end'
}

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([])
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

  const posts = [
    {
      answerCount: 1,
      answeredDate: 'Oct 14, 2021 at 14:30',
      bookmarkCount: 1200,
      lastModified: 'modified Apr 7 at 11:14',
      isAccepted: true,
      numOfVotes: 3020,
      questionTitle: 'Attempting to save only the metadata to a file from RTSP stream',
      url: 'https://stackoverflow.com/questions/71715649/attempting-to-save-only-the-metadata-to-a-file-from-rtsp-stream',
      reputationCount: 50,
      tags: [
        {
          name: 'javascript',
          url: 'https://stackoverflow.com/questions/tagged/javascript'
        },
        {
          name: 'python',
          url: 'https://stackoverflow.com/questions/tagged/javascript'
        },
        {
          name: 'pandas',
          url: 'https://stackoverflow.com/questions/tagged/javascript'
        }
      ],
      user: {
        reputationCount: 123,
        username: 'kfbustam',
        userProfileURL: 'https://stackoverflow.com/questions/tagged/javascript',
        profileIconSrc: 'http://placekitten.com/200/300' 
      },
      voteCount: 4,
      viewCount: 1234576
    }
  ]

  const numFormatter = (num) => Math.abs(num) > 9999 ? 
    Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'm' : 
    (Math.abs(num) > 999 ? 
    Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num))

  useEffect(() => {
    if (bookmarks.length > 0) return
    async function fetchBookmarks() {
      axios.post(`${API_URL}/api/question/getAllBookmarkedQuestions/`, {
        user: window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
      })
      .then(res => {
        setBookmarks(res.data.data)
      })
      .catch(err => {
          console.log(err)
      })
    }
  fetchBookmarks()
  }, [])

  const onClickScore = async () => {
    const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const response = await axios.get(`${API_URL}/api/user/getSortPost/${userID}/Bookmarks/Score`)
    const questionData = response.data.user
    setBookmarks(questionData)
  }

  const onClickActivity = async () => {
    const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const response = await axios.get(`${API_URL}/api/user/getSortPost/${userID}/Bookmarks/Activity`)
    const questionData = response.data.user
    setBookmarks(questionData)
  }

  const onClickNewest = async () => {
    const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const response = await axios.get(`${API_URL}/api/user/getSortPost/${userID}/Bookmarks/Newest`)
    const questionData = response.data.user
    setBookmarks(questionData)
  }

  const onClickViews = async () => {
    const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const response = await axios.get(`${API_URL}/api/user/getSortPost/${userID}/Bookmarks/Views`)
    const questionData = response.data.user
    setBookmarks(questionData)
  }

  const onClickAdded = async () => {
    const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const response = await axios.get(`${API_URL}/api/user/getSortPost/${userID}/Bookmarks/Added`)
    const questionData = response.data.user
    setBookmarks(questionData)
  }

  return (
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>{answersCount} Bookmarks</h3>
        <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle}>
            <Button onClick={onClickScore}>Score</Button>
            <Button onClick={onClickActivity}>Activity</Button>
            <Button onClick={onClickNewest}>Newest</Button>
            <Button onClick={onClickViews}>Views</Button>
            <Button onClick={onClickAdded}>Added</Button>
          </ButtonGroup>
        </div>
      </div>
      <List>
        {
          bookmarks.map((post) => {
            // const {
            //   answerCount,
            //   answeredDate,
            //   bookmarkCount,
            //   isAccepted,
            //   numOfVotes,
            //   url,
            //   questionTitle,
            //   tags,
            //   viewCount
            // } = post
            return (
              <>
                <ListItem style={postListItem}>
                  <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%', gap: 5}}>
                  {/* <Chip icon={isAccepted ? <Check /> : null} label={`${post.answer_id.count} answers`} color="success" /> */}
                  <Chip icon={1 ? <Check /> : null} label={`${post.answer_id.length} answers`} color="success" />

                    <div style={{display: 'flex', margin: 'auto 0px auto 0px', color: '#6A747C'}}>{numFormatter(post.vote_id.length)} votes</div>
                    <div style={{display: 'flex', margin: 'auto 0px auto 0px', color: 'orange'}}>{numFormatter(post.totalviews)} views</div>
                    {/* <div style={{display: 'flex', margin: 'auto 0px auto 0px'}}>{numFormatter(bookmarkCount)} bookmarks</div> */}
                  </div>
                  <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
                    <h3>
                      {/* <a href={url} style={{color: '#0074cc', fontSize: 17}}>{questionTitle}</a> */}
                      <a  style={{color: '#0074cc', fontSize: 17}}>{post.title}</a>
                    </h3>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <div>
                      {
                        post.tags.map(tag => {
                          // const {name, url} = tag;
                          return <a className='search-tag-block me-1' href={tag.url}>{tag.name}</a>;
                        })
                      }
                    </div>
                    <div>
                      {posts.createdAt}
                    </div>
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

export default Bookmarks