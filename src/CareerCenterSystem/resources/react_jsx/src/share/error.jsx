import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Col, Container, Row } from 'react-bootstrap';

class Error extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Alert variant="danger">{this.props.error}</Alert>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

if (document.getElementsByName('error') != null) {
    let errors = document.getElementsByName('error');
    for (let error of errors) {
        ReactDOM.render(<Error error={error.textContent} />, error)
    }
}