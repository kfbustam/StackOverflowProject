import React, { useState, useEffect } from 'react'
import './AllTags.css'
import Container from 'react-bootstrap/Container'
import { Typeahead } from 'react-bootstrap-typeahead'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function AllTags() {
  const [tags, setTags] = useState([{}])
  const [filteredTags, setFilteredTags] = useState([{}])

  useEffect(() => {
    const data = []

    for (let i = 0; i < 10; i++) {
      data.push({
        name: 'java',
        description: `Java is a high-level object oriented programming language. Use this tag when you're 
        having problems using or understanding the language itself. This tag is frequently 
        used alongside other tags for libraries and/or frameworks used by Java developers.`,
        count: 1842957,
        todaycount: 387,
        weekcount: 2253
      })

      setTags(data)
      setFilteredTags(data)
    }
  }, [])

  return (
    <Container className='all-tags-container mt-4'>
      <h1 className='all-tags-header mb-3'>Tags</h1>
      <p className='all-tags-desc'>A tag is a keyword or label that categorizes your question with other, similar questions.
        <br />
        Using the right tags makes it easier for others to find and answer your question.
      </p>
      <Typeahead id='all-tags-input' options={[]} placeholder='Filter by tag name' className='w-25' maxResults={5}
      />
      <Row className='mt-5'>
        {filteredTags.map(tag => (
          <Col sm={6} md={4} lg={3} className='mb-3'>
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
  )
}

export default AllTags