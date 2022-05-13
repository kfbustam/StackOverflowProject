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
import ReactTimeAgo from 'react-time-ago'
import Image from 'react-bootstrap/Image'
import defaultimg from '../../default/default.png'

const TagsOverview = () => {
    const { tagName } = useParams()
    const navigate = useNavigate()
    const [tagDesc, setTagDesc] = useState('')
    const [questions, setQuestions] = useState([{}])
    const [filteredQuestions, setFilteredQuestions] = useState([{}])
    const date = new Date()

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

                const sortedData = [].concat(data).sort((a, b) => {
                    if (a.modifiedAt && b.modifiedAt) return new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
                    else if (a.modifiedAt) return new Date(b.createdAt).getTime() - new Date(a.modifiedAt).getTime()
                    else if (b.modifiedAt) return new Date(b.modifiedAt).getTime() - new Date(a.createdAt).getTime()
                    else return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                })

                setQuestions(sortedData)
                setFilteredQuestions(sortedData)

                setTagDesc(res.data.description)
            })
            .catch(err => {
                console.log(err)
            })
    }, [tagName])

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

    const handleInteresting = () => {
        let temp = questions

        //new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()

        setFilteredQuestions([].concat(temp).sort((a, b) => {
            if (a.modifiedAt && b.modifiedAt) return new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
            else if (a.modifiedAt) return new Date(b.createdAt).getTime() - new Date(a.modifiedAt).getTime()
            else if (b.modifiedAt) return new Date(b.modifiedAt).getTime() - new Date(a.createdAt).getTime()
            else return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }))
    }

    const handleHot = () => {
        let temp = questions

        setFilteredQuestions([].concat(temp).sort((a, b) => b.todayview - a.todayview))
    }

    const handleScore = () => {
        let temp = questions

        setFilteredQuestions([].concat(temp).sort((a, b) => b.score - a.score))
    }

    const handleUnanswered = () => {
        let temp = questions

        temp = temp.filter(question => question.answer_id.filter(answer => answer.isBest === true).length === 0)

        setFilteredQuestions(temp)
    }

    return (
        <div className='tags-overview-container'>
            <Container className='mt-3'>
                <h3 className='tags-overview-title'>Questions tagged {'['}{tagName}{']'}</h3>
                <Button className='tags-ask-question-button' onClick={() => localStorage.getItem('jwt') != null ? navigate('/askQuestion') : navigate('/login')}>Ask question</Button>
                <div className='tags-overview-desc mt-3'>
                    <p style={{ fontSize: '13px', color: 'black' }}>{tagDesc}</p>
                </div>
            </Container>
            <Container className='mt-3'>
                <div>
                    <p className='num-results mt-2'>{filteredQuestions.length} questions</p>
                    <ButtonGroup style={{ marginLeft: '52%' }}>
                        <Button variant='outline-secondary' onClick={handleInteresting}>Interesting</Button>
                        <Button variant='outline-secondary' onClick={handleHot}>Hot</Button>
                        <Button variant='outline-secondary' onClick={handleScore}>Score</Button>
                        <Button variant='outline-secondary' onClick={handleUnanswered}>Unanswered</Button>
                    </ButtonGroup>
                </div>
            </Container>
            <hr />
            {filteredQuestions.map(question => (
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
                                <Link to={`/questions/${question._id}`} className='search-question-title mb-2'>{question.title}</Link>
                                <p className='search-question-desc mb-1'>{question.body}</p>
                                {question.tags && question.tags.map(tag => (
                                    <div className='search-tag-block me-1' onClick={() => navigate(`/questions/tagged/${tag.name}`)}>{tag.name}</div>
                                ))}
                                <p className='search-author'>
                                    <Image src={(question.user && question.user.profileURL) ? `${API_URL}/image/${question.user.profileURL}` : defaultimg} style={{width: '25px', height: '25px', display: 'inline-block'}}/>
                                    <Link to={question.user ? `/users/${question.user._id}` : '/'} className='search-name-link'> {question.user && question.user.username}</Link>
                                    <strong> {question.user && question.user.reputation} </strong>
                                    {question.modifiedAt ? 'modified at ' : 'asked '}
                                    {question.modifiedAt ? <ReactTimeAgo date={question.modifiedAt ? question.modifiedAt : date} locale="en-US" />
                                    : <ReactTimeAgo date={question.createdAt ? question.createdAt : date} locale="en-US" />}
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