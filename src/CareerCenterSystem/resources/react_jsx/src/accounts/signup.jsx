import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { getCsrfTokenTag } from '../share/csrf.jsx';

class Signup extends React.Component {
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
                            <Form.Row>
                                <Form.Group as={Col} controlId="id_username">
                                    <Form.Label>学籍番号</Form.Label>
                                    <Form.Control name="username"  type="text" placeholder="学籍番号を入力してください" maxlength="150" required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="id_password1">
                                    <Form.Label>パスワード</Form.Label>
                                    <Form.Control name="password1" type="password" placeholder="パスワードを入力してください" required />
                                </Form.Group>
                                <Form.Group as={Col} controlId="id_password2">
                                    <Form.Label>パスワード (確認)</Form.Label>
                                    <Form.Control name="password2" type="password" placeholder="再度同じパスワードを入力してください" required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="id_last_name">
                                    <Form.Label>姓</Form.Label>
                                    <Form.Control name="last_name" type="text" placeholder="姓を入力してください" required />
                                </Form.Group>
                                <Form.Group as={Col} controlId="id_first_name">
                                    <Form.Label>名</Form.Label>
                                    <Form.Control name="first_name" type="text" placeholder="名を入力してください" required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="id_last_name">
                                <Form.Label>姓（かな）</Form.Label>
                                <Form.Control name="last_name_kana" type="text" placeholder="姓（かな）を入力してください" required />
                            </Form.Group>
                                <Form.Group as={Col} controlId="id_first_name">
                                    <Form.Label>名（かな）</Form.Label>
                                    <Form.Control name="first_name_kana" type="text" placeholder="名（かな）を入力してください" required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="id_email">
                                    <Form.Label>メールアドレス</Form.Label>
                                    <Form.Control name="email" type="text" placeholder="メールアドレスを入力してください" required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="id_phone_number">
                                    <Form.Label>電話番号</Form.Label>
                                    <Form.Control name="phone_number" type="text" placeholder="電話番号を入力してください" required />
                                </Form.Group>
                            </Form.Row>
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

ReactDOM.render(
    <Signup />,
    document.getElementById('main')
)