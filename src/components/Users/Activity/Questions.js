import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Check from '@mui/icons-material/Check';

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

const truncate = (input) => input.length > 70 ? `${input.substring(0, 70)}...` : input;

function Questions() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const [questions, setQuestions] = useState([])
  // [
  //   {
  //     answerCount: 1,
  //     askedDate: 'Oct 14, 2021 at 14:30',
  //     lastModified: 'modified Apr 7 at 11:14',
  //     isAccepted: true,
  //     numOfVotes: 10,
  //     questionTitle: 'Attempting to save only the metadata to a file from RTSP stream',
  //     url: 'https://stackoverflow.com/questions/71715649/attempting-to-save-only-the-metadata-to-a-file-from-rtsp-stream',
  //     reputationCount: 50,
  //     tags: [
  //       {
  //         name: 'javascript',
  //         url: 'https://stackoverflow.com/questions/tagged/javascript'
  //       },
  //       {
  //         name: 'python',
  //         url: 'https://stackoverflow.com/questions/tagged/javascript'
  //       },
  //       {
  //         name: 'pandas',
  //         url: 'https://stackoverflow.com/questions/tagged/javascript'
  //       }
  //     ],
  //     user: {
  //       reputationCount: 123,
  //       username: 'kfbustam',
  //       userProfileURL: 'https://stackoverflow.com/questions/tagged/javascript',
  //       profileIconSrc: 'http://placekitten.com/200/300' 
  //     },
  //     voteCount: 4,
  //     viewCount: 124
  //   }
  // ]
  const user = {
    aboutMeText: 'about',
    questionsCount: 12,
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
    questionsCount,
  } = user

  useEffect(() => {
    if (questions.length > 0) return
    async function fetchQuestions() {
      let user = JSON.parse(localStorage.getItem('user'))
      const response = await axios.get('http://localhost:3001/api/user/getQuestionsTab/' + user._id )
      const questionData = response.data.user
      console.log(questionData);
      setQuestions(questionData)
    }
    fetchQuestions()
  }, [questions])

  useEffect(() => {
    async function fetchAnswers() {
      let user = JSON.parse(localStorage.getItem('user'))
      const response = await axios.get('http://localhost:3001/api/user/getQuestionsTab/' + user._id )
      const questionData = response.data.user
      setQuestions(questionData)
    }
  fetchAnswers()
  }, [])

  return (
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>{questionsCount} Questions</h3>
        <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle}>
            <Button>Score</Button>
            <Button>Activity</Button>
            <Button>Newest</Button>
            <Button>Views</Button>
          </ButtonGroup>
        </div>
      </div>
      <List>
        {
          questions.map((post) => {
            const {
              askedDate,
              isAccepted,
              numOfVotes,
              url,
              questionTitle,
              tags,
              viewCount
            } = post
            return (
              <>
                <ListItem style={postListItem}>
                  <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%', gap: 5}}>
                    <div style={{display: 'flex', margin: 'auto 0px auto 0px'}}>{numOfVotes} votes</div>
                    <Chip icon={isAccepted ? <Check /> : null} label="Accepted" color="success" />
                    <div style={{display: 'flex', margin: 'auto 0px auto 0px', color: '#6A747C'}}>{viewCount} views</div>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
                    <h3>
                      <a href={url} style={{color: '#0074cc', fontSize: 17}}>{truncate(questionTitle)}</a>
                    </h3>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <div>
                      {
                        tags.map(tag => {
                          const {name, url} = tag;
                          return <a className='search-tag-block me-1' href={url}>{name}</a>;
                        })
                      }
                    </div>
                    <div>
                      asked {new Date(askedDate).toLocaleDateString("en-US", options)}
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

export default Questions