import "./Question.css";
// import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AdminSidebar from './Sidebar';
import React, { useState, useEffect } from 'react'

import axios from 'axios'
import API_URL from '../../apiConfig'

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
const numFormatter = (num) => Math.abs(num) > 9999 ? 
  Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'm' : 
  (Math.abs(num) > 999 ? 
  Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num))

const truncate = (input) => input.length > 70 ? `${input.substring(0, 70)}...` : input;

export default function ReviewQuestion() {
  const [data, setData] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    if(data.length >0){return}
    axios.get(`${API_URL}/api/question/getAdminApprovalQuestions`)
    .then(res => {
      const dataQuestions = res.data.questions
      setData(dataQuestions)
      console.log("bleh",data);
    })
    .catch(err => {
      console.log(err)
    })
  }, [data])

  function getNumberOfDays(start) {
    const date1 = new Date(start);
    const date2 = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    if(diffInDays < 1){
      return "today";
    }
    if(diffInDays < 2){
      return "yesterday";
    }

    return diffInDays + " days ago";
}


  return (
    <>
    <div className="containers">
       <AdminSidebar />
    
   
    <div className="newTag">
        <div style={rootStyle}>
      <div style={titleHeaderStyle}>
        <h2>
          Review Question
        </h2>
      </div>

      <Divider />
      <List>
        
        { data.length > 0 &&
          data.map((question) => {
            // const {
            //   answerCount,
            //   isAnswered,
            //   lastModified,
            //   questionURL,
            //   questionTitle,
            //   reputationCount: questionReputationCount,
            //   tags,
            //   user,
            //   voteCount, 
            //   viewCount
            // } = question
            // const {
            //   reputationCount: userReputationCount,
            //   username,
            //   userProfileURL,
            //   profileIconSrc
            // } = user
            //question.answer_id.length? 

            const answeredStyle = question.answer_id && question.answer_id.length ? {backgroundColor: '#5DBA7C', borderRadius: 5} : {};
            const answerCountStyle = question.answer_id && question.answer_id.length ? {
              fontWeight: 'bold',
              color: 'white',
            } : 
            {
              fontWeight: 'bold',
              color: '#6A747C',
              fontSize: 17
            };
            const answeredTextStyle = question.answer_id && question.answer_id.length ? {
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
                      <strong style={{ fontWeight: 'bold', color: '#6A747C',fontSize: 17}}>{question.vote_id.length}</strong>
                      <span style={{fontSize: 11}}>votes</span>
                    </div>
                    <div style={ {...answeredStyle, ...{display: 'flex', flexDirection: 'column', textAlign: 'center'}} }>
                      <strong style={answerCountStyle}>{question.answer_id.length}</strong>
                      <span style={answeredTextStyle}>{question.answer_id.length=== 1 ? 'answer': 'answers'}</span>
                    </div>
                    {/* <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                      <strong style={{ fontWeight: 'bold', color: '#6A747C',fontSize: 17}}>{question.vote_id.length}</strong>
                      <span style={{fontSize: 11}}>votes</span>
                    </div> */}
                    {/* <div style={reputationCountStyle}>
                      <span style={{fontSize: 11, color: 'white'}}>+{questionReputationCount}</span>
                    </div> */}
                  </div>
                  <div style={questionListItemRightSideStyle}>
                    <div>
                      <h3>
                        <a onClick={() => navigate(`/reviewquestion/${question._id}`)} style={{color: '#0074cc', fontSize: 17}}>{question.title}</a>
                        {/* <a style={{color: '#0074cc', fontSize: 17}}>{question.title}</a> */}
                      </h3>
                      <div>
                        {
                          question.tags.map(tag => {
                            //const {name, url} = tag;
                            //return <a className='search-tag-block me-1' href={url}>{name}</a>;
                            return <a className='search-tag-block me-1' >{tag.name}</a>;
                          })
                        }
                      </div>
                    </div>
                    <div style={userCardStyle}>
         
                      <a onClick={() => navigate('/users/'+question.user._id)} style={{color: '#0074cc', fontSize: 14, margin: 'auto 5px auto 5px'}}>{ question.user ? <p>{question.user.username}</p>  : <p></p>}</a>

                      <span style={{ margin: 'auto 0px auto 0px'}}>{ question.user ? <p>{question.user.reputation}</p>  : <p></p>}</span>
                      {/* <a href={questionURL} style={{ margin: 'auto 5px auto 5px'}}>{lastModified}</a> */}
                      <a  style={{color: '#0074cc', fontSize: 14, margin: 'auto 5px auto 5px'}}>{ question.user ? <p>{getNumberOfDays(question.updatedAt)}</p>  : <p></p>}</a>
                      
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
