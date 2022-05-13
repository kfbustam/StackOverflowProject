import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Check from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../apiConfig'

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

function Answers() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const [anscount, setAnswerCount] = useState(0)
  const [answers, setAnswers] = useState([])

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
  const navigate = useNavigate()

  useEffect(() => {
    if (answers.length > 0) return
    async function fetchAnswers() {
      const response = await axios.get(`${API_URL}/api/user/getAnswersTab/` + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) )
      const answersData = response.data.user
 
      let anstotal = response.data.user.length 
  
      //console.log(anstotal)
      setAnswerCount(anstotal)
      setAnswers(answersData)
    }
  fetchAnswers()
  }, [])

  const onClickScore = async () => {
    const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const response = await axios.get(`${API_URL}/getSortPost/${userID}/Questions/Score`)
    console.log(response)
  }

  const onActivityScore = async () => {
    const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const response = await axios.get(`${API_URL}/getSortPost/${userID}/Questions/Activity`)
    console.log(response)
  }

  const onNewestScore = async () => {
    const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const response = await axios.get(`${API_URL}/getSortPost/${userID}/Questions/Newest`)
    console.log(response)
  }

  return (
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>{anscount} Answer(s)</h3>
        <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle}>
            <Button onClick={onClickScore}>Score</Button>
            <Button onClick={onActivityScore}>Activity</Button>
            <Button onClick={onNewestScore}>Newest</Button>
          </ButtonGroup>
        </div>
      </div>
      <List>
        {
          answers.map((post) => {
            const {
              answeredDate,
              answerTitle,
              isAccepted,
              numOfVotes,
              questionId,
              questionTitle,
              tagLabel,
              tags,
            } = post
            return (
              <>
                <ListItem style={postListItem}>
                  <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%', gap: 5}}>
                    <div style={{display: 'flex', margin: 'auto 0px auto 0px'}}>{numOfVotes} votes</div>
                   {isAccepted?<Chip icon={ <Check />} label="Best Answer" color="success" />:null} 
                  </div>
                  <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
                    <h3>
                      <a onClick={() => navigate(`/questions/${questionId}`)} style={{color: '#0074cc', fontSize: 17}}>{truncate(questionTitle)}</a>
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
                      answered {new Date(answeredDate).toLocaleDateString("en-US", options)}
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

export default Answers