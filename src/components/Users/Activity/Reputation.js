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

  useEffect(() => {
    if (Object.values(reputations).length > 0) return
    async function fetchReputations() {
      const response = await axios.get(`${API_URL}/api/user/getReputationHistory/` + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) )
      const reputationData = response.data.groupByDate;
      setReputations(reputationData)
    }
    fetchReputations()
  }, [])

  const onClickPost = async () => {
    const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const response = await axios.get(`${API_URL}/api/user/getSortPost/${userID}/Reputations/Post`)
    const reputationData = response.data.user
    setReputations(reputationData)
  }


  const onClickTime = async () => {
    const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const response = await axios.get(`${API_URL}/api/user/getSortPost/${userID}/Reputations/Time`)
    const reputationData = response.data.user
    setReputations(reputationData)
  }


  const onClickGraph = async () => {
    const userID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const response = await axios.get(`${API_URL}/api/user/getSortPost/${userID}/Reputations/Graph`)
    const reputationData = response.data.user
    setReputations(reputationData)
  }


  return (
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>Reputation</h3>
        <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <ButtonGroup variant="outlined" aria-label="outlined button group" style={filterButtonGroupStyle}>
            <Button onClick={onClickPost}>Post</Button>
            <Button onClick={onClickTime}>Time</Button>
            <Button onClick={onClickGraph}>Graph</Button>
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