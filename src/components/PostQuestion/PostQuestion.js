import React, { useRef, useState } from 'react'
import './PostQuestion.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import API_URL from '../../apiConfig'
import MyToast from '../MyToast/MyToast'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

function PostQuestion() {
    const editorRef = useRef(null);
    const tagsInput = useRef(null)
    const titleInput = useRef(null)

    const [showToast, setShowToast] = useState(false)
    const [toastText, setToastText] = useState('')

    const navigate = useNavigate()

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const handleSubmit = () => {
        if (missingFields()) {
            setShowToast(true)
            setToastText('Please fill in all fields')
        }
        else {
            const tagsArray = getTagsInLowerCase()

            if (tagsArray.length > 5) {
                setShowToast(true)
                setToastText('Please enter a maximum of 5 tags')
            }
            else if (localStorage.getItem('jwt') === null) {
                setShowToast(true)
                setToastText('Please log into an account')
            }
            else {
                axios.get(`${API_URL}/api/tag/getPopularTags`)
                    .then(res => {
                        const allTags = res.data.tags
                        const idArray = allTags.filter(tag => tagsArray.includes(tag.name.toLowerCase())).map(tag => tag._id)

                        const userID = jwt_decode(localStorage.getItem('jwt')).sub

                        axios.post(`${API_URL}/api/question/addQuestion`, {
                            title: titleInput.current.value,
                            body: editorRef.current.getContent(),
                            tags: idArray,
                            user: userID
                        })
                        .then(res => {
                            navigate('/questions/overview')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }

    const getTagsInLowerCase = () => {
        const tagsArray = tagsInput.current.value.trim().split(' ')
        return tagsArray.map(tag => tag.toLowerCase())
    }

    const missingFields = () => {
        return !titleInput.current.value || !editorRef.current.getContent() || !tagsInput.current.value
    }

    return (
        <div className='post-page-container'>
            <Container >
                <Row className='mb-3' >
                    <Col className='mt-5'>
                        <h3>Ask a public question</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Container className='post-question-container pt-3 pb-3'>
                            <h6>Title</h6>
                            <p className='info-text'>Be specific and imagine you're asking a question to another person</p>
                            <Form.Control size='sm' placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                                type='text' ref={titleInput} />
                            <h6 className='mt-3'>Body</h6>
                            <p className='info-text'>Include all the information someone would need to answer your question</p>
                            {/*<Form.Control as='textarea' rows={7}/>*/}
                            <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: 'lists link codesample image',
                                    toolbar: 'bold italic | link codesample image | bullist numlist ',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                            <h6 className='mt-3'>Tags</h6>
                            <p className='info-text'>Add up to 5 tags to describe what your question is about</p>
                            <Form.Control size='sm' placeholder='e.g. (sql jquery reactjs)' type='text' ref={tagsInput} />
                        </Container>
                        <Button className='review-question-button mt-3 mb-3' onClick={handleSubmit}>Review your question</Button>
                    </Col>
                    <Col md={4}>
                        <Card className='mb-3'>
                            <Card.Header>Step 1. Draft your question</Card.Header>
                            <Card.Body>
                                <Card.Text className='card-body-text'>The community is here to help you with specific coding,
                                    algorithm, or language problems.
                                </Card.Text>
                                <Card.Text className='card-body-text'>
                                    Avoid asking opinion-based questions.
                                </Card.Text>
                                <Accordion flush>
                                    <Accordion.Item eventKey='1'>
                                        <Accordion.Header className='accord-head-container'>
                                            <p className='accord-head'><span className='list-number'>1.</span> Summarize the problem</p>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul style={{ padding: '0' }}>
                                                <li className='list-text'>Include details about your goals</li>
                                                <li className='list-text'>Describe expected and actual results</li>
                                                <li className='list-text'>Include any error messages</li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey='2'>
                                        <Accordion.Header className='accord-head-container'>
                                            <p className='accord-head'><span className='list-number'>2.</span> Describe what you've tried</p>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <p className='card-body-text'>
                                                Show what you’ve tried and tell us what you found
                                                (on this site or elsewhere) and why it didn’t meet your needs.
                                                You can get better answers when you provide research.
                                            </p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey='3'>
                                        <Accordion.Header className='accord-head-container'>
                                            <p className='accord-head'><span className='list-number'>3.</span> Show some code</p>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <p className='card-body-text'>
                                                When appropriate, share the minimum amount of code others need to
                                                reproduce your problem (also called a minimum, reproducible example)
                                            </p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Body>
                        </Card>
                        <Accordion className='mb-3'>
                            <Accordion.Item eventKey='4'>
                                <Accordion.Header className='support-accord-header'>Have a non-programming question?</Accordion.Header>
                                <Accordion.Body>
                                    <a href='/' className='card-link'>Super user</a>
                                    <p className='card-body-text'>Troubleshooting hardware and software issues</p>
                                    <a href='/' className='card-link'>Software engineering</a>
                                    <p className='card-body-text'>For software development methods and process questions</p>
                                    <a href='/' className='card-link'>Hardware recommendations</a>
                                    <br />
                                    <a href='/' className='card-link'>Software recommendations</a>
                                    <p className='card-body-text' style={{ marginTop: '7px' }}>Ask questions about the site on <a className='card-link' href='/'>meta</a></p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion>
                            <Accordion.Item eventKey='5'>
                                <Accordion.Header className='support-accord-header'>More helpful links</Accordion.Header>
                                <Accordion.Body>
                                    <p className='card-body-text'>Find more information <a className='card-link' href='/'>about how to ask a good question here</a></p>
                                    <p className='card-body-text'>Visit the <a className='card-link' href='/'>help center</a></p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    </Col>
                </Row>
            </Container>
            <MyToast show={showToast} handleClose={() => setShowToast(false)} text={toastText} />
        </div>
    )
}

export default PostQuestion