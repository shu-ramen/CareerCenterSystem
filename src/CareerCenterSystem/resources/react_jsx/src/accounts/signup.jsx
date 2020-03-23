import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { getCsrfTokenTag } from '../share/csrf.jsx';


class SignupParent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            first_name: props.first_name,
            last_name: props.last_name,
            first_name_kana: props.first_name_kana,
            last_name_kana: props.last_name_kana,
            email: props.email,
            phone_number: props.phone_number
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeFirstNameKana = this.onChangeFirstNameKana.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeLastNameKana = this.onChangeLastNameKana.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    }

    onChangeUsername(username) {this.setState({username: username});}
    onChangeFirstName(first_name) {this.setState({first_name: first_name});}
    onChangeFirstNameKana(first_name_kana) {this.setState({first_name_kana: first_name_kana});}
    onChangeLastName(last_name) {this.setState({last_name: last_name});}
    onChangeLastNameKana(last_name_kana) {this.setState({last_name_kana: last_name_kana});}
    onChangeEmail(email) {this.setState({email: email});}
    onChangePhoneNumber(phone_number) {this.setState({phone_number: phone_number});}

    render() {
        return (
            <Signup
            username={this.state.username}
            first_name={this.state.first_name}
            last_name={this.state.last_name}
            first_name_kana={this.state.first_name_kana}
            last_name_kana={this.state.last_name_kana}
            email={this.state.email}
            phone_number={this.state.phone_number}
            onChangeUsername={this.onChangeUsername}
            onChangeFirstName={this.onChangeFirstName}
            onChangeFirstNameKana={this.onChangeFirstNameKana}
            onChangeLastName={this.onChangeLastName}
            onChangeLastNameKana={this.onChangeLastNameKana}
            onChangeEmail={this.onChangeEmail}
            onChangePhoneNumber={this.onChangePhoneNumber}
            />
        )
    }
}

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
                                    <Form.Control name="username" className="imeInactive" value={this.props.username} type="text" placeholder="学籍番号を入力してください" maxlength="150" autocomplete="off" onChange={event => this.props.onChangeUsername(event.target.username)} required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="id_password1">
                                    <Form.Label>パスワード</Form.Label>
                                    <Form.Control name="password1" className="imeInactive" type="password" placeholder="パスワードを入力してください" autocomplete="off" required />
                                </Form.Group>
                                <Form.Group as={Col} controlId="id_password2">
                                    <Form.Label>パスワード (確認)</Form.Label>
                                    <Form.Control name="password2" className="imeInactive" type="password" placeholder="再度同じパスワードを入力してください" autocomplete="off" required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="id_last_name">
                                    <Form.Label>姓</Form.Label>
                                    <Form.Control name="last_name" className="imeActive" value={this.props.last_name} type="text" placeholder="姓を入力してください" autocomplete="off" onChange={event => this.props.onChangeLastName(event.target.last_name)} required />
                                </Form.Group>
                                <Form.Group as={Col} controlId="id_first_name">
                                    <Form.Label>名</Form.Label>
                                    <Form.Control name="first_name" className="imeActive" value={this.props.first_name} type="text" placeholder="名を入力してください" autocomplete="off" onChange={event => this.props.onChangeFirstName(event.target.first_name)}  required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="id_last_name">
                                <Form.Label>姓（かな）</Form.Label>
                                <Form.Control name="last_name_kana" className="imeActive" value={this.props.last_name_kana} type="text" placeholder="姓（かな）を入力してください" autocomplete="off" onChange={event => this.props.onChangeLastNameKana(event.target.last_name_kana)}  required />
                            </Form.Group>
                                <Form.Group as={Col} controlId="id_first_name">
                                    <Form.Label>名（かな）</Form.Label>
                                    <Form.Control name="first_name_kana" className="imeActive" value={this.props.first_name_kana} type="text" placeholder="名（かな）を入力してください" autocomplete="off" onChange={event => this.props.onChangeFirstNameKana(event.target.first_name_kana)}  required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="id_email">
                                    <Form.Label>メールアドレス</Form.Label>
                                    <Form.Control name="email" className="imeInactive" value={this.props.email} type="email" placeholder="メールアドレスを入力してください" autocomplete="off" onChange={event => this.props.onChangeEmail(event.target.email)} required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="id_phone_number">
                                    <Form.Label>電話番号</Form.Label>
                                    <Form.Control name="phone_number" className="imeInactive" value={this.props.phone_number} type="tel" placeholder="電話番号を入力してください" autocomplete="off" onChange={event => this.props.onChangePhoneNumber(event.target.phone_number)} required />
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


let username = document.getElementById("id_username").value;
let first_name = document.getElementById("id_first_name").value;
let last_name = document.getElementById("id_last_name").value;
let first_name_kana = document.getElementById("id_first_name_kana").value;
let last_name_kana = document.getElementById("id_last_name_kana").value;
let email = document.getElementById("id_email").value;
let phone_number = document.getElementById("id_phone_number").value;
let password1 = document.getElementById("id_password1").value;
let password2 = document.getElementById("id_password2").value;

ReactDOM.render(
    <SignupParent
    username={username} 
    first_name={first_name}
    last_name={last_name}
    first_name_kana={first_name_kana}
    last_name_kana={last_name_kana}
    email={email}
    phone_number={phone_number}/>,
    document.getElementById('main')
)