import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Alert, Container, Button } from 'react-bootstrap';

class LoggedOut extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12} sx={12}>
                                <Alert variant="light">ご利用ありがとうございました。</Alert>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12} sx={12}>
                                <Button variant="primary" size="lg" href="/accounts/login/"  block>ログイン</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12} sx={12}>
                                <Button variant="link" href="/accounts/signup/" block>新規登録</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

ReactDOM.render(
    <LoggedOut />,
    document.getElementById("main")
)