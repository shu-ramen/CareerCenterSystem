import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

class Register extends React.Component {
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