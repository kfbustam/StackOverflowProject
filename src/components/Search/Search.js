import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './Search.css'
const Search = () => {
    return (
        <div className='search-container'>
            <Container className='mt-3 search-head-container'>
                <Row >
                    <Col md={8}>
                        <h3>Search results</h3>
                    </Col>
                    <Col md={4} style={{display: 'flex', justifyContent: 'right'}}>
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
            <hr className='search-hr'/>
        </div>
    )
}

export default Search