
   
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='login-container text-center'>
            <Image className='icon mt-4 mb-3' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png" />
            <Container className='form-container pb-4 pt-4'>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label className='login-text'>Email</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label className='login-text'>Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Button className='login-button'>Log in</Button>
                </Form>
            </Container>
            <p className='mt-4 register-text'>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    )
}

export default Login