import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Col, Container, Row } from 'react-bootstrap';

class Message extends React.Component {
    constructor() {
        super();
    }

    getMessageAlerts() {
        let messages = this.props.messages.map((message) => this.messageAlert(message));
        return (
            <Row>
                {messages}
            </Row>
        );
    }

    messageAlert(message) {
        return (
            <Col  xl={12} lg={12} md={12} sm={12} sx={12}>
                <Alert variant="info">{message}</Alert>
            </Col>
        );
    }

    render() {
        let messageAlerts = this.getMessageAlerts();

        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        {messageAlerts}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

if (document.getElementsByName('message').length != 0) {
    let messageTags = document.getElementsByName('message');
    let messages = [];
    for (let messageTag of messageTags) {
        messages.push(messageTag.textContent);
    }
    ReactDOM.render(
        <Message messages={messages} />,
        document.getElementById('messages')
    );
}