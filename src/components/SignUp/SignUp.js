import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './SignUp.css'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { RiQuestionAnswerFill, RiTrophyFill } from 'react-icons/ri'
import { TiArrowUnsorted } from 'react-icons/ti'
import { AiFillTags } from 'react-icons/ai'
import axios from 'axios'
import API_URL from '../../apiConfig'
import { useNavigate } from 'react-router-dom';
import MyToast from '../MyToast/MyToast'

function SignUp() {
    const nameInput = useRef(null)
    const emailInput = useRef(null)
    const passwordInput = useRef(null)

    const navigate = useNavigate()

    const [showToast, setShowToast] = useState(false)
    const [toastText, setToastText] = useState('')

    const validEmail = (email) => {
        const regexEmail = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/

        return regexEmail.test(email)
    }

    const validPassword = (password) => {
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/

        return regexPassword.test(password)
    }

    const handleSubmit = () => {
        const name = nameInput.current.value
        const email = emailInput.current.value
        const password = passwordInput.current.value

        if (!name || !email || !password) {
            setShowToast(true)
            setToastText('Please enter all fields')
        }
        else if (!validEmail(email)) {
            setShowToast(true)
            setToastText('Please enter email correctly')
        }
        else if (!validPassword(password)) {
            setShowToast(true)
            setToastText('Please enter password correctly')
        }
        else {
            axios.post(`${API_URL}/api/auth/register`, {
                username: nameInput.current.value,
                email: emailInput.current.value,
                password: passwordInput.current.value
            })
            .then(res => {
                localStorage.setItem('jwt', 'bearer ' + res.data.user.token)

                const newUser = res.data.user.newUser
                localStorage.setItem('user', JSON.stringify({
                    username: newUser.username,
                    email: newUser.email,
                    _id: newUser._id,
                    profileURL: newUser.profileURL
                }))
    
                navigate('/')
            })
            .catch(err => {
                console.log(err)
                setShowToast(true)
                setToastText('Email already in use')
            })
        }
    }

    return (
        <div className='signup-container'>
            <Row>
                <Col>
                    <Container className='info-container'>
                        <h3>Join the Stack Overflow community</h3>
                        <ul className='signup-list'>
                            <li ><RiQuestionAnswerFill className='signup-icon' />Get unstuck - ask a question</li>
                            <li><TiArrowUnsorted className='signup-icon' />Unlock new privileges like voting and commenting</li>
                            <li><AiFillTags className='signup-icon' />Save your favorite tags, filters, and jobs</li>
                            <li><RiTrophyFill className='signup-icon' />Earn reputation and badges</li>
                        </ul>
                    </Container>
                </Col>
                <Col>
                    <Container className='form-container pb-4 pt-4'>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label className='signup-text'>Display name</Form.Label>
                                <Form.Control type="text" ref={nameInput}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label className='signup-text'>Email</Form.Label>
                                <Form.Control type="email" ref={emailInput}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label className='signup-text'>Password</Form.Label>
                                <Form.Control type="password" ref={passwordInput}/>
                                <div className='password-info-container'>
                                    <Form.Text className="text-muted password-info">
                                        Passwords must contain at least five characters,
                                        including at least 1 letter and 1 number.
                                    </Form.Text>
                                </div>
                            </Form.Group>
                            <Button className='login-button' onClick={handleSubmit}>Sign up</Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
            <MyToast show={showToast} handleClose={() => setShowToast(false)} text={toastText} />
        </div>
    )
}

export default SignUp