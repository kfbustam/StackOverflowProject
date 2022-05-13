import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../../apiConfig'
import MyToast from '../MyToast/MyToast'

function Login() {
    const emailInput = useRef(null)
    const passwordInput = useRef(null)

    const navigate = useNavigate()

    const [showToast, setShowToast] = useState(false)
    const [toastText, setToastText] = useState('')

    const validEmail = (email) => {
        const regexEmail = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/

        return regexEmail.test(email)
    }

    const handleSubmit = () => {
        const email = emailInput.current.value
        const password = passwordInput.current.value

        if (!email || !password) {
            setShowToast(true)
            setToastText('Please enter both fields')
        }
        else if (!validEmail(email)) {
            setShowToast(true)
            setToastText('Please enter email correctly')
        }
        else {
            axios.post(`${API_URL}/api/auth/login`, {
                email: emailInput.current.value,
                password: passwordInput.current.value
            })
            .then(res => {
                localStorage.setItem('jwt', 'bearer ' + res.data.user.token)

                const foundUser = res.data.user.foundUser
                localStorage.setItem('user', JSON.stringify({
                    username: foundUser.username,
                    email: foundUser.email,
                    _id: foundUser._id,
                    profileURL: foundUser.profileURL
                }))
    
                if (email === 'admin@gmail.com') navigate('/addtag')
                else navigate('/users/'+foundUser._id)
            })
            .catch(err => {
                console.log(err)
                setShowToast(true)
                setToastText('Invalid email/password')
            })
        }

    }

    return (
        <div className='login-container text-center'>
            <Image className='login-icon' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png" />
            <Container className='form-container pb-4 pt-4 mt-3'>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label className='login-text'>Email</Form.Label>
                        <Form.Control type="email" ref={emailInput}/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label className='login-text'>Password</Form.Label>
                        <Form.Control type="password" ref={passwordInput}/>
                    </Form.Group>
                    <Button className='login-button' onClick={handleSubmit}>Log in</Button>
                </Form>
            </Container>
            <p className='mt-4 register-text'>Don't have an account? <Link className='login-link' to="/signup">Sign up</Link></p>
            <MyToast show={showToast} handleClose={() => setShowToast(false)} text={toastText} />
        </div>
    )
}

export default Login