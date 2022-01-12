import React from 'react'
import { Card, Container, Col, ListGroup, Row, } from 'react-bootstrap';

import DevInfoCard from '../components/DevInfoCard';

function Updates() {
    return (
        <Container className="mt-4">
            <Row>
                <Col lg="8" md="6" sm="12">
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-3">Future Updates under work</Card.Title>
                            <Card.Body>
                                <Card.Text>The following updates are being planned to be implemented.</Card.Text>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <h6>Administrator Dashboard</h6>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h6>Profile's Page</h6>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h6>Transistion Animations</h6>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                    <Card className='mt-3' variant="outline-secondary">
                        <Card.Body>
                            <Card.Title>GitHub Repository</Card.Title>
                            <Card.Text>All the progress can be tracked here, as well as the source code can be obtained.</Card.Text>
                            <ListGroup>
                                <ListGroup.Item as="a" href="https://github.com/hmd0404-nitk-eee/myconnect">
                                    <i className="fa fa-github"></i>&nbsp;&nbsp;GitHub
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="4" md="6" sm="12">
                    <DevInfoCard />
                </Col>
            </Row>
        </Container>
    )
}

export default Updates;
