import "./Toptags.css";
import AdminSidebar from './Sidebar';
import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import { Typeahead } from 'react-bootstrap-typeahead'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import API_URL from '../../apiConfig'

export default function Toptags() {
    const [tags, setTags] = useState([{}])
    const [filteredTags, setFilteredTags] = useState([{}])
    const [tagNames, setTagNames] = useState([])
    const [searchText, setSearchText] = useState('')
  
    useEffect(() => {
      axios.get(`${API_URL}/api/user/top10Results`)
      .then(res => {
        const dataTags = res.data.top10Results.top10Tags
  
        setTags(dataTags)
        setFilteredTags(dataTags)
  
        // const nameData = dataTags.map(tag => tag.name)
        // const distinctNames = [...new Set(nameData)]
        // setTagNames(distinctNames)
      })
      .catch(err => {
        console.log(err)
      })
    }, [])
  
  return (
    <>
    <div className="containers">
       <AdminSidebar />
    
   
    <div className="containerside">
    <Container className='all-tags-containers mt-4'>
      <h1 className='all-tags-header mb-3'>Top 10 Tags</h1>
     
      <Row className='mt-5'>
        {filteredTags.map(tag => (
          <Col sm={6} md={filteredTags.length < 3 ? 6 : 4} lg={filteredTags.length < 3 ? 4 : 3} className='mb-3'>
            <Container className='all-tags-tag-container pt-2'>
              <div className='all-tags-block'>{tag.name}</div>
              <p className='all-tags-description mt-2'>{tag.description}</p>
              <div className='all-tags-count-container'>
                <p className='all-tags-count'>{tag.count} questions</p>
              </div>
              <div className='all-tags-count-container'>
                <p className='all-tags-count'>{tag.todaycount} asked today, {tag.weekcount} this week</p>
              </div>
            </Container>
          </Col>
        ))}
      </Row>

    </Container>

    </div>
    </div>
    </>
  );
}
