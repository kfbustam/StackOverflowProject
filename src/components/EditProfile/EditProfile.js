import React, { useState, useRef, useEffect } from 'react'
import './EditProfile.css'
import Container from 'react-bootstrap/Container'
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import API_URL from '../../apiConfig';
import MyToast from '../MyToast/MyToast'


const titleHeaderStyle = {
    display: 'flex',
    flexDirection: 'row',
    margin: '20px 0px 0px 20px',
}

const EditProfile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const userID = JSON.parse(localStorage.getItem('user'))._id

    const [imgPrev, setImgPrev] = useState(null)
    const hiddenFileInput = useRef(null)

    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [about, setAbout] = useState('')

    const [showToast, setShowToast] = useState(false)
    const [toastText, setToastText] = useState('')

    const handlePicUpload = (e) => {
        setImgPrev(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        axios.get(`${API_URL}/api/user/getBasicDetails/${userID}`)
            .then(res => {
                const userData = res.data.user
                setUser(userData)
                setUsername(userData.username)
                setLocation(userData.location)                
                setAbout(userData.about)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleSubmit = () => {
        axios.put(`${API_URL}/api/user/editInfo/${userID}`, {
            username: username,
            location: location,
            about: about
        })
        .then(res => {
            setShowToast(true)
            setToastText('User info saved')
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <Container className='edit-profile-container mb-3'>
            {user &&
                <div>
                    <div style={titleHeaderStyle}>
                        <IconButton key="profileIcon" onClick={() => navigate('/users')}>
                            <Avatar src='' style={{ width: 160, height: 160 }} />
                        </IconButton>
                        <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto auto auto 0px' }}>
                            <h2 className='ms-2'>
                                {user.username}
                            </h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button key="askQuestion" onClick={() => navigate('/editProfile')} style={{ height: 40 }}>Edit profile</Button>
                        </div>
                    </div>
                    <h4 className='mt-2'>Edit your profile</h4>
                    <hr />
                    <h5 className='mt-2'>Public information</h5>
                    <Form className='edit-profile-form'>
                        <Form.Group className='mb-3'>
                            <strong>Profile picture</strong>
                            <Image src={imgPrev} className='mb-2 mt-1'
                                style={{ width: '150px', height: '150px' }} />
                            <Button onClick={() => hiddenFileInput.current.click()}>Change picture</Button>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <strong >Display name</strong>
                            <Form.Control type='text' className='mt-1 w-50 ps-2' value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <strong>Location</strong>
                            <Form.Control type='text' className='mt-1 w-50 ps-2' value={location}
                            onChange={(e) => setLocation(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <strong>About</strong>
                            <Form.Control as='textarea' rows={5} className='mt-1' value={about}
                            onChange={(e) => setAbout(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handlePicUpload}
                        style={{ display: 'none' }}
                    />
                    <Button className='mt-3' onClick={handleSubmit}>Save profile</Button>
                    <MyToast show={showToast} handleClose={() => setShowToast(false)} text={toastText} />
                </div>}
        </Container>
    )
}

export default EditProfile