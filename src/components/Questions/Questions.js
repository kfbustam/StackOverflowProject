import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '60%'
}

const titleHeaderStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: '20px 0px 0px 20px',
}

const filterButtonGroupStyle = {
  display: 'flex',
  margin: '15px 0px 15px 0px',
  justifyContent: 'end'
}

const questionListItem = {
  display: 'flex',
  flexDirection: 'row',
  height: 150
}

const questionListItemRightSideStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '0px 0px 0px 10px',
  height: '100%', width: '100%', 
}

const userCardStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  marginRight: 4
}

function Questions() {
  const navigate = useNavigate()
  const questions = [{
    answerCount: 1,
    lastModified: 'modified Apr 7 at 11:14',
    questionTitle: 'Attempting to save only the metadata to a file from RTSP stream',
    questionURL: 'https://stackoverflow.com/questions/71715649/attempting-to-save-only-the-metadata-to-a-file-from-rtsp-stream',
    reputationCount: 50,
    tags: [
      {
        name: 'javascript',
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
    viewCount: 124
  }]

  return (
    <div style={rootStyle}>
      <div style={titleHeaderStyle}>
        <h2>
          Top Questions
        </h2>
        <Button key="askQuestion" onClick={() => navigate('/askQuestion')} variant="contained" style={{height: 40}}>Ask question</Button>
      </div>
      <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle}>
        <Button>Interesting</Button>
        <Button>Hot</Button>
        <Button>Score</Button>
        <Button>Unanswered</Button>
      </ButtonGroup>
      <Divider />
      <List>
        {
          questions.map((question) => {
            const {
              answerCount,
              lastModified,
              questionURL,
              questionTitle,
              reputationCount: questionReputationCount,
              tags,
              user,
              voteCount, 
              viewCount
            } = question
            const {
              reputationCount: userReputationCount,
              username,
              userProfileURL,
              profileIconSrc
            } = user
            return (
              <>
                <ListItem style={questionListItem}>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{textAlign: 'center'}}>
                      {voteCount} votes
                    </div>
                    <div>
                      <Button variant="outlined" color="success" style={{width: 100}}>
                        {answerCount} {answerCount === 1 ? 'answer': 'answers'}
                      </Button>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      {viewCount} views
                    </div>
                    <div style={{margin: 'auto'}}>
                      <Button variant="contained">+{questionReputationCount}</Button>
                    </div>
                  </div>
                  <div style={questionListItemRightSideStyle}>
                    <div>
                      <h3>
                        <a href={questionURL} style={{color: '#0074cc', fontSize: 17}}>{questionTitle}</a>
                      </h3>
                    </div>
                    <div>
                    {
                      tags.map((tag) => {
                        const {name, url} = tag
                        return (
                          <Button size="small" variant="contained" href={url}>{name}</Button>
                        );
                      })
                    }
                    </div>
                    <div style={userCardStyle}>
                      <IconButton key="profileIcon" onClick={() => navigate('/profile')} size="small" />
                      <Avatar src={profileIconSrc}/>
                      <a href={userProfileURL} style={{color: '#0074cc', fontSize: 14, margin: 'auto 5px auto 5px'}}>{username}</a>
                      <span style={{ margin: 'auto 0px auto 0px'}}>{userReputationCount}</span>
                      <a href={questionURL} style={{ margin: 'auto 5px auto 5px'}}>{lastModified}</a>
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