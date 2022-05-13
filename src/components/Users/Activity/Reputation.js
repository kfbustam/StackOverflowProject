import React, { useEffect, useState } from 'react';
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion'
import API_URL from '../../../apiConfig';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
}

function Reputation() {
  const [reputations, setReputations] = useState([])

  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    if (Object.values(reputations).length > 0) return
    async function fetchReputations() {
      const response = await axios.get(`${API_URL}/api/user/getReputationHistory/` + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) )
      const reputationData = response.data.groupByDate;
      setReputations(reputationData)
    }
    fetchReputations()
  }, [])

  return (
    <div style={rootStyle}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <h3>Reputation</h3>
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