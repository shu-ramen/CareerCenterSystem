import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { getCsrfTokenTag } from '../share/csrf.jsx';

class Login extends React.Component {
    constructor() {
        super();
    }

    getFormErrorTag(formError) {
        if (formError) {
            return (
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} sx={12}>
                        <Alert variant="danger">学籍番号とパスワードが一致しません。</Alert>
                    </Col>
                </Row>
            );
        }
        else {
            return "";
        }
    }

    getNextErrorTag(hasNext, authenticated) {
        if (hasNext) {
            if (authenticated) {
                return (
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} sx={12}>
                            <Alert variant="danger">お持ちのアカウントではこちらのページにアクセスできません。権限を持ったアカウントでログインしてください。</Alert>
                        </Col>
                    </Row>
                );
            }
            else {
                return (
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} sx={12}>
                            <Alert variant="danger">このページを閲覧するにはログインしてください。</Alert>
                        </Col>
                    </Row>
                );
            }
        }
        else {
            return "";
        }
    }

    getNextTag() {
        let next = document.getElementsByName("next")[0].value;
        return (
            <input type="hidden" name="next" value={next}></input>
        )
    }

    render() {
        let formErrorTag = this.getFormErrorTag(this.props.formError);
        let nextErrorTag = this.getNextErrorTag(this.props.hasNext, this.props.authenticated);
        let nextTag = this.getNextTag();

        return (
            <Container>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        {formErrorTag}
                        {nextErrorTag}
                        <Form method="POST" action="/accounts/login/">
                            {getCsrfTokenTag()}
                            <Form.Group controlId="id_username">
                                <Form.Label>学籍番号</Form.Label>
                                <Form.Control name="username"  type="text" placeholder="学籍番号を入力してください" autocomplete="off" required />
                            </Form.Group>
                            <Form.Group controlId="id_password">
                                <Form.Label>パスワード</Form.Label>
                                <Form.Control name="password" type="password" placeholder="パスワードを入力してください" autocomplete="off" required />
                            </Form.Group>
                            <Button variant="primary" size="lg"  type="submit" block>ログイン</Button>
                            <Button variant="link" href="/accounts/signup/" block>アカウントを持っていない方はこちら</Button>
                            <Button variant="link" href="/accounts/password/reset/" block>パスワードまたはユーザー名を忘れた場合はこちら</Button>
                            {nextTag}
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

if (document.getElementById('formerror-hasnext-authenticated-login') != null) {
    ReactDOM.render(<Login formError={true} hasNext={true} authenticated={true} />, document.getElementById('formerror-hasnext-authenticated-login'))
}

if (document.getElementById('hasnext-authenticated-login') != null) {
    ReactDOM.render(<Login formError={false} hasNext={true} authenticated={true} />, document.getElementById('hasnext-authenticated-login'))
}

if (document.getElementById('formerror-hasnext-not-authenticated-login') != null) {
    ReactDOM.render(<Login formError={true} hasNext={true} authenticated={false} />, document.getElementById('formerror-hasnext-not-authenticated-login'))
}

if (document.getElementById('hasnext-not-authenticated-login') != null) {
    ReactDOM.render(<Login formError={false} hasNext={true} authenticated={false} />, document.getElementById('hasnext-not-authenticated-login'))
}

if (document.getElementById('formerror-authenticated-login') != null) {
    ReactDOM.render(<Login formError={true} hasNext={false} authenticated={true} />, document.getElementById('formerror-authenticated-login'))
}

if (document.getElementById('authenticated-login') != null) {
    ReactDOM.render(<Login formError={false} hasNext={false} authenticated={true} />, document.getElementById('authenticated-login'))
}

if (document.getElementById('formerror-not-authenticated-login') != null) {
    ReactDOM.render(<Login formError={true} hasNext={false} authenticated={false} />, document.getElementById('formerror-not-authenticated-login'))
}

if (document.getElementById('not-authenticated-login') != null) {
    ReactDOM.render(<Login formError={false} hasNext={false} authenticated={false} />, document.getElementById('not-authenticated-login'))
}