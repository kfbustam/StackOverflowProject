import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './Search.css'
import { Link, useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const data = [{
        type: 'question',
        score: 5,
        answer_id: [{
            _id: '5436',
            isBest: false
        },
        {
            _id: '23435',
            isBest: true
        }],
        title: 'Question title',
        body: `<p><strong>Bold Text</strong></p> 
        <p><em>Italics Text</em></p> <p><em><strong>Bold and Italics Text</strong></em></p> 
        <p><a title="Stack overflow link" href="https://stackoverflow.com/">https://stackoverflow.com/</a>
        </p> <pre class="language-javascript"><code>const text = 'Hello world' console.log(text)
        </code></pre> <p>
        <img src="https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?b=1&amp;k=20&amp;m=185262648&amp;s=170667a&amp;w=0&amp;h=2ouM2rkF5oBplBmZdqs3hSOdBzA4mcGNCoF2P0KUMTM=" alt="" width="150" height="150">
        </p> <ul> <li>List 1</li> <li>List 2</li> </ul> <ol> <li>Number list 1</li> <li>Number list 2</li> </ol> <p>&nbsp;</p>`,
        tags: [{
            _id: '534567',
            name: 'java'
        },
        {
            _id: '546573',
            name: 'php'
        }],
        user: {
            _id: '5345',
            username: 'Phillip Nguyen'
        },
        createdAt: new Date(2022, 0, 6)
    },
    {
        type: 'question',
        score: 7,
        answer_id: [{
            _id: '5436',
            isBest: false
        },
        {
            _id: '23435',
            isBest: false
        }],
        title: 'Question title',
        body: 'Here is a piece of C++ code that shows some very peculiar behavior. For some strange reason, sorting the data (before the timed region) miraculously makes the loop almost six times faster. #include <a ',
        tags: [{
            _id: '534567',
            name: 'java'
        },
        {
            _id: '546573',
            name: 'php'
        }],
        user: {
            _id: '5345',
            username: 'Phillip Nguyen'
        },
        createdAt: new Date(2022, 3, 12)
    },
    {
        type: 'answer',
        score: 6,
        question_id: {
            _id: '45346',
            title: 'Answer title',
            tags: [{
                _id: '534567',
                name: 'java'
            },
            {
                _id: '546573',
                name: 'php'
            }]
        },
        answer: 'Description of answer',
        isBest: false,
        user_id: {
            _id: '5345',
            username: 'Phillip Nguyen'
        },
        createdAt: new Date(2022, 3, 27)
    },
    {
        type: 'answer',
        score: 6,
        question_id: {
            _id: '45346',
            title: 'Answer title',
            tags: [{
                _id: '534567',
                name: 'java'
            },
            {
                _id: '546573',
                name: 'php'
            }]
        },
        answer: 'Description of answer',
        isBest: true,
        user_id: {
            _id: '5345',
            username: 'Phillip Nguyen'
        },
        createdAt: new Date(2022, 1, 3)
    },
    ]

    useEffect(() => {

        for (let i = 0; i < data.length; i++) {
            let desc = '';

            if (data[i].type === 'question') {
                desc = data[i].body
                let plainDesc = desc.replace(/<[^>]+>/g, '');

                data[i].body = plainDesc

            } else if (data[i].type === 'answer') {
                desc = data[i].answer
                let plainDesc = desc.replace(/<[^>]+>/g, '');

                data[i].answer = plainDesc
            }           
        }


        setPosts(data)
    }, [])

    const handleNewest = () => {
        setPosts([].concat(posts).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
    }

    const handleRelevance = () => {
        setPosts([].concat(posts).sort((a, b) => b.score - a.score))
    }

    return (
        <div className='search-container'>
            <Container className='mt-3 search-head-container'>
                <div>
                    <h3 className='search-results-title'>Search results</h3>
                    <Button className='ask-question-button' onClick={() => navigate('/postquestion')}>Ask question</Button>
                </div>
            </Container>
            <Container className='mt-3'>
                <div>
                    <p className='num-results mt-2'>{posts.length} results</p>
                    <ButtonGroup style={{ marginLeft: '52%' }}>
                        <Button variant='outline-secondary' onClick={handleRelevance}>Relevance</Button>
                        <Button variant='outline-secondary' onClick={handleNewest}>Newest</Button>
                    </ButtonGroup>
                </div>
            </Container>
            <hr className='search-hr' />
            {posts.map(post => (
                <div>
                    <Container>
                        <Row>
                            {post.type === 'question' ?
                                <Col md={2} className='text-center' style={{ width: '80px' }}>
                                    <strong className='vote-number'>{post.score}</strong>
                                    <p className='vote-text'>votes</p>
                                    <div className={post.answer_id.filter(answer => answer.isBest === true).length > 0 ? 'answered' : null}>
                                        <strong className={post.answer_id.filter(answer => answer.isBest).length > 0 ? 'answer-number' : 'unanswered-number'}>{post.answer_id.length}</strong>
                                        <p className={post.answer_id.filter(answer => answer.isBest).length > 0 ? 'answer-text' : 'unanswered-text'}>answers</p>
                                    </div>
                                </Col> :
                                <Col md={2} className='text-center' style={{ width: '80px'}}>
                                    <strong className='vote-number' style={{color: post.isBest ? '#47A868' : '#6A747C'}}>{post.score}</strong>
                                    <p className='vote-text' style={{color: post.isBest ? '#47A868' : '#6A747C'}}>votes</p>
                                </Col>}
                            <Col md={10} style={{ width: '700px' }}>
                                <Link to='/' className='search-question-title mb-2'>{post.type === 'question' ? 'Q' : 'A'}: {post.type === 'question' ? post.title : post.question_id.title}</Link>
                                <p className='search-question-desc mb-1'>{post.type === 'question' ? post.body : post.answer}</p>
                                {post.type === 'question' ? post.tags.map(tag => (
                                    <div className='search-tag-block me-1'>{tag.name}</div>
                                )) :
                                post.question_id.tags.map(tag => (
                                    <div className='search-tag-block me-1'>{tag.name}</div>
                                ))}
                                <p className='search-author'>{post.type === 'question' ? 'Asked' : 'Answered'} 
                                    {' ' + post.createdAt.toLocaleDateString('en-us', { year: "numeric", day: 'numeric', month: "short" })} by 
                                    <Link to='/users' className='search-name-link'> {post.type === 'question' ? post.user.username : post.user_id.username}</Link>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                    <hr className='search-hr' />
                </div>
            ))}
        </div>
    )
}

export default Search