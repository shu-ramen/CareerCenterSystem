import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { getCsrfTokenTag } from '../share/csrf.jsx';

class Register extends React.Component {
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
                        <Form method="POST">
                            {getCsrfTokenTag()}
                            <Form.Group controlId="id_name">
                                <Form.Label>カテゴリ名</Form.Label>
                                <Form.Control name="name" type="text" placeholder="カテゴリ名を入力してください" maxlength="150" required />
                            </Form.Group>
                            <Button variant="success" size="lg" type="submit" block>登録</Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

ReactDOM.render(
    <Register />,
    document.getElementById('main')
);