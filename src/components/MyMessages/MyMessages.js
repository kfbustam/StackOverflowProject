import React, { useEffect, useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './MyMessages.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import ReactTimeAgo from 'react-time-ago'
import { useParams, useNavigate } from 'react-router-dom'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'
import API_URL from '../../apiConfig'
import defaultimg from '../../default/default.png'

const MyMessages = () => {
    const date = new Date()
    const { roomID } = useParams()
    const navigate = useNavigate()
    const [conversations, setConversations] = useState([{}])
    const [messages, setMessages] = useState([{}])
    const messageInput = useRef(null)
    const [allUsers, setAllUsers] = useState([{}])

    const userID = JSON.parse(localStorage.getItem('user'))._id.toString()

    useEffect(() => {
        getConversations()

        getMessages()

        getAllUsers()
    }, [userID, roomID])

    const getAllUsers = () => {
        axios.get(`${API_URL}/api/user/getNewUsers`)
        .then(res => {
            setAllUsers(res.data.user)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getConversations = () => {
        axios.get(`${API_URL}/api/message/getAllUserConversations/${userID}`)
            .then(res => {
                let convoData = res.data.data
                for (let i = 0; i < convoData.length; i++) {
                    const receiver = convoData[i].members.find(user => user._id != userID)

                    convoData[i].receiver = receiver
                }
                setConversations(convoData)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getMessages = () => {
        if (roomID) {
            axios.get(`${API_URL}/api/message/getAllMessagesOfConversation/${roomID}`)
                .then(res => {
                    let messagesData = res.data.data
                    
                    for (let i = 0; i < messagesData.length; i++) {
                        messagesData[i].date = new Date(messagesData[i].createdAt)

                        console.log(messagesData[i].date)
                    }

                    setMessages(messagesData)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const handleSubmit = () => {
        axios.post(`${API_URL}/api/message/addMessageToConversation`, {
            conversationId: roomID,
            sender: userID,
            message: messageInput.current.value
        })
        .then(res => {
            messageInput.current.value = ''
            getMessages()
            getConversations()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleCreate = (receiverID) => {
        axios.post(`${API_URL}/api/message/createConversation`, {
            sender: userID,
            receiver: receiverID
        })
        .then(res => {
            navigate(`/mymessages/${res.data.data._id}`)
        })
        .catch(err => {
            navigate(`/mymessages/${err.response.data.conversation}`)
        })
    }

    return (
        <div className='my-messages-container'>
            <div className='my-messages-list me-3'>
                <div className='my-messages-header text-center pt-2 pb-2'>
                    <DropdownButton title="Start a conversation" size='sm' variant='dark'>
                        {allUsers.map(user => (
                            <Dropdown.Item onClick={() => handleCreate(user._id)}>
                                <Image src={user.profileURL? `${API_URL}/image/${user.profileURL}` : defaultimg} roundedCircle className='my-messages-dropdown-image me-2'/>
                                {user.username}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className='my-messages-header text-center pt-2 pb-2'>
                    <strong>My messages</strong>
                </div>
                <div style={{ overflow: 'auto', height: '70vh' }}>
                    <ListGroup variant='flush'>
                        {conversations && conversations.map(conversation => (
                            <ListGroup.Item
                                onClick={() => navigate(`/mymessages/${conversation._id}`)}
                                active={roomID === conversation._id}
                                action
                                className={roomID === conversation._id && 'my-messages-active'}>
                                <Row>
                                    <Col md={3}>
                                        <Image src={(conversation.receiver && conversation.receiver.profileURL) ? `${API_URL}/image/${conversation.receiver.profileURL}` : defaultimg} roundedCircle />
                                    </Col>
                                    <Col md={9}>
                                        <p className='my-messages-name-list'>{conversation.receiver && conversation.receiver.username}</p>
                                        <p className='my-messages-preview'>{conversation.lastMessage && conversation.lastMessage.message}</p>
                                        <ReactTimeAgo date={conversation.lastMessage ? new Date(conversation.lastMessage.createdAt) : date} locale="en-US" className='my-messages-preview-time' />
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                        ))}
                    </ListGroup>
                </div>
            </div>
            {(roomID && messages) &&
                <div>
                    <Container className='my-messages-posts-container'>
                        <div style={{ overflow: 'auto', height: '65vh' }}>
                            {messages.map(message => (
                                <div className={message.sender === userID ? 'mb-3 my-messages-right' : 'mb-3 my-messages-left'}>
                                    <div className='my-messages-post' style={{ backgroundColor: message.sender === userID ? '#F48023' : '#242629' }}>
                                        {message.message}
                                        <br />
                                        <ReactTimeAgo date={message.date ? message.date : date} locale="en-US" className='my-messages-time' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                    <Container>
                        <textarea type='text-area' className='my-messages-input me-3' rows={3} cols={70} ref={messageInput}/>
                        <Button variant='dark' className='mt-3' size='lg' onClick={handleSubmit}>Send message</Button>
                    </Container>
                </div>}
        </div>
    )
}

export default MyMessages