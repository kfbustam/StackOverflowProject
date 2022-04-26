import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './Search.css'
import { Link } from 'react-router-dom'

const Search = () => {
    const questions = [{
        votes: 5,
        answers: 3,
        title: 'Question title',
        description: 'Description of the problem',
        answered: false,
        tags: ['java', 'python', 'javascript', 'react', 'node'],
        user: 'Phillip Nguyen',
        date: new Date()
    },
    {
        votes: 5,
        answers: 3,
        title: 'Question title',
        description: 'Here is a piece of C++ code that shows some very peculiar behavior. For some strange reason, sorting the data (before the timed region) miraculously makes the loop almost six times faster. #include <a',
        answered: true,
        tags: ['java', 'python', 'javascript'],
        user: 'Phillip Nguyen',
        date: new Date()
    },
    {
        votes: 5,
        answers: 3,
        title: 'Question title',
        description: 'Description of the problem',
        answered: false,
        tags: ['java', 'python', 'javascript'],
        user: 'Phillip Nguyen',
        date: new Date()
    }]

    return (
        <div className='search-container'>
            <Container className='mt-3 search-head-container'>
                <div>
                    <h3 className='search-results-title'>Search results</h3>
                    <Button className='ask-question-button'>Ask question</Button>
                </div>
            </Container>
            <Container className='mt-3'>
                <div>
                    <p className='num-results mt-2'>{questions.length} results</p>
                    <ButtonGroup style={{marginLeft: '52%'}}>
                        <Button variant='outline-secondary'>Relevance</Button>
                        <Button variant='outline-secondary'>Newest</Button>
                    </ButtonGroup>
                </div>
            </Container>
            <hr className='search-hr' />
            {questions.map(question => (
                <div>
                    <Container>
                        <Row>
                            <Col md={2} className='text-center' style={{ width: '80px' }}>
                                <strong className='vote-number'>{question.votes}</strong>
                                <p className='vote-text'>votes</p>
                                <div className={question.answered ? 'answered' : null}>
                                    <strong className={question.answered ? 'answer-number' : 'unanswered-number'}>{question.answers}</strong>
                                    <p className={question.answered ? 'answer-text' : 'unanswered-text'}>answers</p>
                                </div>
                            </Col>
                            <Col md={10} style={{ width: '700px' }}>
                                <Link to='/' className='search-question-title mb-2'>Q: {question.title}</Link>
                                <p className='search-question-desc mb-1'>{question.description}</p>
                                {question.tags.map(tag => (
                                    <div className='search-tag-block me-1'>{tag}</div>
                                ))}
                                <p className='search-author'>Asked {question.date.toLocaleDateString('en-us', { year:"numeric", day: 'numeric', month:"short"})} by <Link to='/' className='search-name-link'>{question.user}</Link></p>
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