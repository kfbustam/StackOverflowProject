import React, { useState, useEffect } from 'react'
import './TagsOverview.css'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import API_URL from '../../apiConfig'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const TagsOverview = () => {
    const { tagName } = useParams()
    const navigate = useNavigate()
    const [tagDesc, setTagDesc] = useState('')
    const [questions, setQuestions] = useState([{}])

    useEffect(() => {
        axios.get(`${API_URL}/api/question/getByTag/${tagName}`)
            .then(res => {
                const data = res.data.questions

                for (let i = 0; i < data.length; i++) {
                    let desc = '';

                    desc = data[i].body
                    let plainDesc = desc.replace(/<[^>]+>/g, '');

                    plainDesc = plainDesc.replace('&nbsp;', ' ')

                    data[i].body = plainDesc
                }

                setQuestions(data)

                setTagDesc(res.data.description)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const formatAnswer = (answersArr) => {
        let className = 'mb-0'

        if (answersArr) {
            if (answersArr.length === 0) {
                className += ' tags-overview-no-answers'
            }
            else {
                if (answersArr.filter(answer => answer.isBest === true).length > 0) {
                    className += ' tags-overview-best-answer'
                }
                else {
                    className += ' tags-overview-has-answer'
                }
            }
        }

        return className
    }

    return (
        <div className='tags-overview-container'>
            <Container className='mt-3'>
                <h3 className='tags-overview-title'>Questions tagged {'['}{tagName}{']'}</h3>
                <Button className='tags-ask-question-button' onClick={() => navigate('/askQuestion')}>Ask question</Button>
                <div className='tags-overview-desc mt-3'>
                    <p style={{ fontSize: '13px', color: 'black' }}>{tagDesc}</p>
                </div>
            </Container>
            <Container className='mt-3'>
                <div>
                    <p className='num-results mt-2'>{questions.length} questions</p>
                    <ButtonGroup style={{ marginLeft: '52%' }}>
                        <Button variant='outline-secondary' >Interesting</Button>
                        <Button variant='outline-secondary' >Hot</Button>
                        <Button variant='outline-secondary' >Score</Button>
                        <Button variant='outline-secondary' >Unanswered</Button>
                    </ButtonGroup>
                </div>
            </Container>
            <hr />
            {questions.map(question => (
                <div>
                    <Container>
                        <Row>
                            <Col md={2} className='tags-overview-stats'>
                                <div >
                                    <p className='mb-0 tags-overview-votes'><span style={{ fontWeight: '500' }}>{question.score}</span> votes</p>
                                </div>
                                <div >
                                    <p className={formatAnswer(question.answer_id)}><span style={{ fontWeight: '500' }}>{question.answer_id ? question.answer_id.length : 0}</span> answers</p>
                                </div>
                                <div>
                                    <p className='mb-0 tags-overview-views'><span style={{ fontWeight: '500' }}>{question.views}</span> views</p>
                                </div>
                            </Col>
                            <Col md={10} style={{ width: '700px' }}>
                                <Link to='/' className='search-question-title mb-2'>{question.title}</Link>
                                <p className='search-question-desc mb-1'>{question.body}</p>
                                {question.tags && question.tags.map(tag => (
                                    <div className='search-tag-block me-1' onClick={() => navigate(`/questions/tagged/${tag.name}`)}>{tag.name}</div>
                                ))}
                                <p className='search-author'>
                                    <Link to='/users' className='search-name-link'> {question.user && question.user.username}</Link>
                                    <strong> {question.user && question.user.reputation} </strong>
                                    asked
                                    {' ' + new Date(question.createdAt).toLocaleDateString('en-us', { year: "numeric", day: 'numeric', month: "short" })}
                                </p>
                            </Col>
                        </Row>
                    </Container>
                    <hr />
                </div>
            ))}
        </div>

    )
}

export default TagsOverview