import React from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Gaming = () => {


    return (
        <Container>
            <Row>
                <Col xs={6} md={4}>
                xs=6 md=4
                </Col>
                <Col xs={6} md={4}>
                xs=6 md=4
                </Col>
                <Col xs={6} md={4}>
                xs=6 md=4
                </Col>
            </Row>
        </Container>
    )
}

export default Gaming