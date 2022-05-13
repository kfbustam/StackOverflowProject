import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Accordion from 'react-bootstrap/Accordion'
import API_URL from '../../../apiConfig';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const filterButtonGroupStyle = {
  display: 'flex',
  margin: '15px 0px 15px 0px',
  justifyContent: 'end'
}

function Reputation() {
  const [reputations, setReputations] = useState([])
  const [repCount, setReputationCount] = useState(0)

  const [errorMessages, setErrorMessages] = useState([])
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

  const numFormatter = (num) => Math.abs(num) > 9999 ? 
    Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'm' : 
    (Math.abs(num) > 999 ? 
    Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num))

  const timeStrings = {
    'yesterday': [
      {
        eventCount: 1,
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
      }
    ],
    '2 days ago': [
      {
        eventCount: 1,
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
      }
    ]
  }

  useEffect(() => {
    if (Object.values(reputations).length > 0) return
    async function fetchReputations() {
      let user = JSON.parse(localStorage.getItem('user'))
      const response = await axios.get(`${API_URL}/api/user/getReputationHistory/` + user._id )
      const reputationData = response.data.groupByDate;
      setReputationCount(response.data.groupByDate.length)
      const count = reputationData
      setReputations(reputationData)
    }
    fetchReputations()
  }, [])

  return (
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>Reputation</h3>
        <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle}>
            <Button>Post</Button>
            <Button>Time</Button>
            <Button>Graph</Button>
          </ButtonGroup>
        </div>
      </div>
      <Accordion defaultActiveKey="0">
        {
          Object.entries(reputations).map(([timeString, reputations]) => {
            return (
              <Accordion.Item eventKey={timeString}>
                <Accordion.Header>{timeString}</Accordion.Header>
                {
                  Object.entries(reputations).map(([index, reputation]) => {
                    const {
                      what,
                      reputationChanged,
                      comment,
                    } = reputation
                    return (
                        <Accordion.Body style={{display: 'flex', flexDirection: 'row', gap: 40, margin: 'auto 0px auto 0px'}}>
                          <div>{what}</div>
                          <div style={{display: 'flex', color: 'green'}}>{reputationChanged}</div>
                          <dev style={{color: '#0074cc', fontSize: 17}}>{comment}</dev>
                        </Accordion.Body>
                    )
                  })
                }
              </Accordion.Item>
            )
          })
        }
      </Accordion>
    </div>
  )
}

export default Reputation