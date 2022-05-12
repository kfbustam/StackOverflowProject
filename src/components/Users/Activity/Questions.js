import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Check from '@mui/icons-material/Check';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import API_URL from '../../../apiConfig';
import { useNavigate } from 'react-router-dom';


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
  const [quescount, setQuestionCount] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    if (questions.length > 0) return
    async function fetchQuestions() {
      let user = JSON.parse(localStorage.getItem('user'))
      const response = await axios.get(`${API_URL}/api/user/getQuestionsTab/` + user._id )
      console.log(response.data.user.length)
      const questionData = response.data.user
      setQuestionCount(response.data.user.length)
      setQuestions(questionData)
    }
    fetchQuestions()
  }, [])

  return (
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>{quescount} Question(s)</h3>
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
              questionId,
              questionTitle,
              admin_approval,
              tags,
              viewCount
            } = post
            return (
              <>
                <ListItem style={postListItem}>
                  <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%', gap: 5}}>
                    <div style={{display: 'flex', margin: 'auto 0px auto 0px'}}>{numOfVotes} votes</div>
                    {isAccepted?<Chip icon={ <Check />} label="Best Answer" color="success" />:null}
                    {admin_approval?null:<Chip icon={ <PendingActionsIcon />} label="Pending Approval" color="error" />}
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