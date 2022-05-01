
   
import React from 'react'
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

function SignUp() {
    return (
        <div className='signup-container'>
            <Row>
                <Col>
                    <Container className='info-container'>
                        <h3>Join the Stack Overflow community</h3>
                        <ul className='signup-list'>
                            <li><RiQuestionAnswerFill className='icon' />Get unstuck - ask a question</li>
                            <li><TiArrowUnsorted className='icon' />Unlock new privileges like voting and commenting</li>
                            <li><AiFillTags className='icon' />Save your favorite tags, filters, and jobs</li>
                            <li><RiTrophyFill className='icon' />Earn reputation and badges</li>
                        </ul>
                    </Container>
                </Col>
                <Col>
                    <Container className='form-container pb-4 pt-4'>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label className='signup-text'>Display name</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label className='signup-text'>Email</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label className='signup-text'>Password</Form.Label>
                                <Form.Control type="password" />
                                <div className='password-info-container'>
                                    <Form.Text className="text-muted password-info">
                                        Passwords must contain at least eight characters,
                                        including at least 1 letter and 1 number.
                                    </Form.Text>
                                </div>
                            </Form.Group>
                            <Button className='login-button'>Sign up</Button>
                        </Form>
                    </Container>
                </Col>
            </Row>


        </div>
    )
}

export default SignUp