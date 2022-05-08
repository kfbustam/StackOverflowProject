import React, { useState, useEffect } from 'react'
import './AllTags.css'
import Container from 'react-bootstrap/Container'
import { Typeahead } from 'react-bootstrap-typeahead'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import API_URL from '../../apiConfig'
import { useNavigate } from 'react-router-dom'

function AllTags() {
  const [tags, setTags] = useState([{}])
  const [filteredTags, setFilteredTags] = useState([{}])
  const [tagNames, setTagNames] = useState([])
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${API_URL}/api/tag/getPopularTags`)
    .then(res => {
      const dataTags = res.data.tags

      setTags(dataTags)
      setFilteredTags(dataTags)

      const nameData = dataTags.map(tag => tag.name)
      const distinctNames = [...new Set(nameData)]
      setTagNames(distinctNames)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const handleSearch = (text) => {
    setSearchText(text)
    let allTags = tags

    allTags = allTags.filter(tag => tag.name.toLowerCase().includes(text.toString().toLowerCase()))

    setFilteredTags(allTags)
  }

  return (
    <Container className='all-tags-container mt-4'>
      <h1 className='all-tags-header mb-3'>Tags</h1>
      <p className='all-tags-desc'>A tag is a keyword or label that categorizes your question with other, similar questions.
        <br />
        Using the right tags makes it easier for others to find and answer your question.
      </p>
      <Typeahead id='all-tags-input' options={tagNames} placeholder='Filter by tag name' className='w-25' maxResults={5}
        onInputChange={(text) => handleSearch(text)} onChange={(text) => handleSearch(text)}
        open={searchText.length >= 3}/>
      <Row className='mt-5'>
        {filteredTags.map(tag => (
          <Col sm={6} md={filteredTags.length < 3 ? 6 : 4} lg={filteredTags.length < 3 ? 4 : 3} className='mb-3'>
            <Container className='all-tags-tag-container pt-2'>
              <div className='all-tags-block' onClick={() => navigate(`/questions/tagged/${tag.name}`)}>{tag.name}</div>
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
  )
}

export default AllTags