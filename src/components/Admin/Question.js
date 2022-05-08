import "./Question.css";
import AdminSidebar from './Sidebar';
import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
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
  margin: '5px 0px 10px 20px'
}

const questionListItemRightSideStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%', 
}

const userCardStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  marginRight: 4
}

const reputationCountStyle = {
  backgroundColor: '#1976d2',
  borderRadius: 5,
  display: 'flex',
  flexDirection: 'column',
  height: 40,
  justifyContent: 'center',
  textAlign: 'center',
  width: 50,
}


export default function NewTag() {
  const navigate = useNavigate()
  const questions = [{
    answerCount: 1,
    isAnswered: false,
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
    <>
    <div className="containers">
       <AdminSidebar />
    
   
    <div className="newTag">
        <div style={rootStyle}>
      <div style={titleHeaderStyle}>
        <h2>
          Top Questions
        </h2>
      </div>

      <Divider />
      <List>
        {
          questions.map((question) => {
            const {
              answerCount,
              isAnswered,
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

            const answeredStyle = isAnswered ? {backgroundColor: '#5DBA7C', borderRadius: 5} : {};
            const answerCountStyle = isAnswered ? {
              fontWeight: 'bold',
              color: 'white',
            } : 
            {
              fontWeight: 'bold',
              color: '#6A747C',
              fontSize: 17
            };
            const answeredTextStyle = isAnswered ? {
              fontSize: 11,
              color: 'white',
              marginBottom: 5
            } : {
              fontSize: 11,
              color: '#6A747C',
              marginBottom: 5
            }
            return (
              <>
                <div style={questionListItem}>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                      <strong style={{ fontWeight: 'bold', color: '#6A747C',fontSize: 17}}>{voteCount}</strong>
                      <span style={{fontSize: 11}}>votes</span>
                    </div>
                    <div style={ {...answeredStyle, ...{display: 'flex', flexDirection: 'column', textAlign: 'center'}} }>
                      <strong style={answerCountStyle}>{answerCount}</strong>
                      <span style={answeredTextStyle}>{answerCount === 1 ? 'answer': 'answers'}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                      <strong style={{ fontWeight: 'bold', color: '#6A747C',fontSize: 17}}>{voteCount}</strong>
                      <span style={{fontSize: 11}}>votes</span>
                    </div>
                    <div style={reputationCountStyle}>
                      <span style={{fontSize: 11, color: 'white'}}>+{questionReputationCount}</span>
                    </div>
                  </div>
                  <div style={questionListItemRightSideStyle}>
                    <div>
                      <h3>
                        <a href={questionURL} style={{color: '#0074cc', fontSize: 17}}>{questionTitle}</a>
                      </h3>
                      <div>
                        {
                          tags.map(tag => {
                            const {name, url} = tag;
                            return <a className='search-tag-block me-1' href={url}>{name}</a>;
                          })
                        }
                      </div>
                    </div>
                    <div style={userCardStyle}>
                      <IconButton key="profileIcon" onClick={() => navigate('/profile')} size="small" />
                      <Avatar src={profileIconSrc}/>
                      <a href={userProfileURL} style={{color: '#0074cc', fontSize: 14, margin: 'auto 5px auto 5px'}}>{username}</a>
                      <span style={{ margin: 'auto 0px auto 0px'}}>{userReputationCount}</span>
                      <a href={questionURL} style={{ margin: 'auto 5px auto 5px'}}>{lastModified}</a>
                    </div>
                  </div>
                </div>
                <Divider />
              </>
            );
          })
        }
      </List>
    </div>

    </div>
    </div>
    </>
  );
}
