import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Row, Col, Container, } from 'react-bootstrap';

class Message extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Alert variant="info">{this.props.message}</Alert>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

if (document.getElementById('message') != null) {
    let message = document.getElementById('message');
    ReactDOM.render(<Message message={message.textContent} />, message)
}