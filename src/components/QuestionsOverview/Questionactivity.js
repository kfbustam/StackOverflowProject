import axios from 'axios';
import { Button, Row, Col, Table } from 'react-bootstrap';
import API_URL from '../../apiConfig'
import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import LeftSideBar from "../LeftSideBar/LeftSideBar";


function Questionactivity() {

    const [tags, setTags] = useState([{}])
    const { questionID } = useParams();


    useEffect(() => {
        console.log(questionID)
        axios.get(`${API_URL}/api/question/getAllQuestionActivities/${questionID}`)
        .then(res => {
          const dataTags = res.data.data[0].activity
          console.log(dataTags)
    
          setTags(dataTags)

        })
        .catch(err => {
          console.log(err)
        })
      }, [])

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <LeftSideBar />
            <Row>
                <Col xs={10} style={{ paddingLeft: '350px' , paddingBottom: '350px' }}>
                    <h3 className="history_title">Timeline </h3>
                    {
                        tags &&
                        <div style={{ marginTop: '10px' }}>
                            <h5>{tags.length} events</h5>
                            <Table responsive style={{ marginTop: '20px' }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>when</th>
                                        <th>what</th>
                                        <th>by</th>
                                        <th>comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tags && tags.map((tags, index) =>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{tags.date}</td>
                                                <td>{tags.what}</td>
                                                <td>{tags._id ? tags._id: 'Unknown'}</td>
                                                <td>{tags.comment}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default Questionactivity;