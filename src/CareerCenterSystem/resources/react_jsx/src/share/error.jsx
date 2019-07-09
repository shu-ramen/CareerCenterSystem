import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Col, Container, Row } from 'react-bootstrap';

class Error extends React.Component {
    constructor() {
        super();
    }

    getErrorAlerts() {
        let errors = this.props.errors.map((error) => this.errorAlert(error));
        return (
            <Row>
                {errors}
            </Row>
        );
    }

    errorAlert(error) {
        return (
            <Col  xl={12} lg={12} md={12} sm={12} sx={12}>
                <Alert variant="danger">{error}</Alert>
            </Col>
        );
    }

    render() {
        let errorAlerts = this.getErrorAlerts();

        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        {errorAlerts}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

if (document.getElementsByName('next').length == 0) {
    console.log("hello");
    if (document.getElementsByName('error').length != 0) {
        let errorTags = document.getElementsByName('error');
        let errors = [];
        for (let errorTag of errorTags) {
            errors.push(errorTag.textContent);
        }
        ReactDOM.render(
            <Error errors={errors} />,
            document.getElementById('errors')
        );
    }
}
else {
    console.log("bye");
}