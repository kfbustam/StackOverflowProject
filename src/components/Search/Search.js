import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './Search.css'
const Search = () => {
    const questions = [{
        votes: 5,
        answers: 3,
        title: 'Question title',
        description: 'Description of the problem',
        answered: false,
        tags: ['java', 'python', 'javascript'],
        user: 'Phillip Nguyen',
        date: new Date()
    },
    {
        votes: 5,
        answers: 3,
        title: 'Question title',
        description: 'Description of the problem',
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
                <Row >
                    <Col md={8}>
                        <h3>Search results</h3>
                    </Col>
                    <Col md={4} style={{ display: 'flex', justifyContent: 'right' }}>
                        <Button className='ask-question-button'>Ask question</Button>
                    </Col>
                </Row>
            </Container>
            <Container className='mt-3'>
                <Row>
                    <Col md={8}>
                        <p className='num-results mt-2'>5 results</p>
                    </Col>
                    <Col md={4}>
                        <ButtonGroup>
                            <Button className='filter-button'>Relevance</Button>
                            <Button className='filter-button'>Newest</Button>
                            <Button className='filter-button'>More</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
            <hr className='search-hr' />
            {questions.map(question => (
                <div>
                    <Container>
                        <Row>
                            <Col md={2} className='text-center' style={{width: '80px'}}>
                                <strong className='vote-number'>{question.votes}</strong>
                                <p className='vote-text'>votes</p>
                                <div className={question.answered ? 'answered' : null}>
                                    <strong className={question.answered ? 'answer-number' : 'unanswered-number'}>{question.answers}</strong>
                                    <p className={question.answered ? 'answer-text' : 'unanswered-text'}>answers</p>
                                </div>
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