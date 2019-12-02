import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { addHeader } from '../share/csrf.jsx';

class Reminder extends React.Component {
    constructor() {
        super();
    }

    remind() {
        let confirmation = confirm("リマインドメールを送信してもよろしいですか？");
        if (confirmation) {
            addHeader(request.post(""))
            .send({

            })
            .end(function (err, res) {
                if (err) {
                    alert(res.text);
                }
                alert("リマインドメールを送信しました．");
                window.location.reload();
            }.bind(this));
        }
    }

    render() {
        return (
            <Container>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Card border="dark" text="black" style={{ borderWidth: '2px' }}>
                            <Card.Header as="h3">直近のリマインドメール送信日時</Card.Header>
                            <Card.Body>
                                <Card.Text as="h4">
                                    {this.props.timestamp}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Button variant="info" size="lg" onClick={() => this.remind()} block>リマインドメール送信</Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

if (document.getElementsByName('timestamp').length > 0) {
    let timestamp = document.getElementsByName('timestamp')[0].value;
    ReactDOM.render(
        <Reminder timestamp={timestamp} />,
        document.getElementById('reminder')
    );
}
else {
    let timestamp = "過去のリマインドメール送信履歴はありません．";
    ReactDOM.render(
        <Reminder timestamp={timestamp} />,
        document.getElementById('reminder')
    );
}