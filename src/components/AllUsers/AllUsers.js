import React, { useState, useEffect } from 'react'
import './AllUsers.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead'
import axios from 'axios'
import API_URL from '../../apiConfig'

function AllUsers() {
  const [users, setUsers] = useState([{}])
  const [filteredUsers, setFilteredUsers] = useState([{}])
  const [usernames, setUsernames] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    /*const data = []

    const fakeUsernames = ['ryeopera', 'figsalt', 'catneo', 'flyran', 'lobster',
      'sunrise', 'singrye', 'floodfly', 'algolcat', 'earthbat']

    for (let i = 0; i < 10; i++) {
      data.push({
        username: fakeUsernames[i],
        location: 'Location',
        reputation: 1000,
        picture: 'http://placekitten.com/200/300'
      })
    }

    const usernameData = data.map(user => user.username)

    setUsers(data)
    setFilteredUsers(data)
    setUsernames(usernameData)*/

    axios.get(`${API_URL}/api/user/getPopularUsers`)
    .then(res => {
      const dataUsers = res.data.user

      dataUsers.forEach(user => {
        user.picture = 'http://placekitten.com/200/300'
        user.location = 'San Jose, CA'
      })

      setUsers(dataUsers)
      setFilteredUsers(dataUsers)
      
      const usernameData = dataUsers.map(user => user.username)
      const distinctUsernames = [...new Set(usernameData)]
      setUsernames(distinctUsernames)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const handleSearch = (text) => {
    setSearchText(text)
    let allUsers = users

    allUsers = allUsers.filter(user => user.username.toLowerCase().includes(text.toString().toLowerCase()))

    setFilteredUsers(allUsers)
  }

  return (
    <Container className='all-users-container mt-4'>
      <h1 className='all-users-header'>Users</h1>
      <Typeahead id='username-input' options={usernames} placeholder='Filter by user' className='w-25' maxResults={5}
        onInputChange={(text) => handleSearch(text)} onChange={(text) => handleSearch(text)}
        open={searchText.length >= 3}/>
      <Row className='mt-5'>
        {filteredUsers.map(user => (
          <Col sm={6} md={filteredUsers.length < 3 ? 6 : 4} lg={filteredUsers.length < 3 ? 4 : 3} className='mb-3'>
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