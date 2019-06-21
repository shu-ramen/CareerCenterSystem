import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Form, Row, Col, Container, Button } from 'react-bootstrap';

class Signup extends React.Component {
    constructor() {
        super();
    }

    getCsrfTokenTag() {
        let csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        return (
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken}></input>
        )
    }

    render() {
        let csrfTokenTag = this.getCsrfTokenTag();
        
        return (
            <Container>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Form method="POST">
                            {csrfTokenTag}
                            <Form.Group controlId="id_username">
                                <Form.Label>学籍番号</Form.Label>
                                <Form.Control name="username"  type="text" placeholder="学籍番号を入力してください" maxlength="150" required />
                            </Form.Group>
                            <Form.Group controlId="id_password1">
                                <Form.Label>パスワード</Form.Label>
                                <Form.Control name="password1" type="password" placeholder="パスワードを入力してください" required />
                            </Form.Group>
                            <Form.Group controlId="id_password2">
                                <Form.Label>パスワード (確認)</Form.Label>
                                <Form.Control name="password2" type="password" placeholder="再度同じパスワードを入力してください" required />
                            </Form.Group>
                            <Button variant="success" size="lg" type="submit" block>登録</Button>
                            <Button variant="link" href="/accounts/login/" block>すでにアカウントを持っている方はこちら</Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

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

ReactDOM.render(
    <Signup />,
    document.getElementById('main')
)