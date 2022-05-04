import React, { useState, useEffect } from 'react'
import './AllUsers.css'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'

function AllUsers() {
  const [users, setUsers] = useState([{}])

  useEffect(() => {
    const data = []

    for (let i = 0; i < 10; i++) {
      data.push({
        username: 'Username',
        location: 'Location',
        reputation: 1000,
        picture: 'http://placekitten.com/200/300'
      })
    }

    setUsers(data)
  }, [])

  return (
    <Container className='all-users-container mt-4'>
      <h1 className='all-users-header'>Users</h1>
      <Form.Control type='text' placeholder='Filter by user' className='w-50'/>
      <Row className='mt-5'>
        {users.map(user => (
          <Col sm={6} md={4} lg={3} className='mb-3'>
            <Image src={user.picture} className='all-users-image me-2'/>
            <Link to='/users' className='all-users-link'>{user.username}</Link>
            <p className='all-users-location'>{user.location}</p>
            <p className='all-users-reputation mb-0'>{user.reputation}</p>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default AllUsers