import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { getCsrfTokenTag } from '../share/csrf.jsx';

class Register extends React.Component {
    constructor() {
        super();
    }

    getCategorySelectBox() {
        let options = this.props.categories.map((category) => this.getCategoryOption(category));
        return (
            <Form.Group controlId="id_category" required>
                <Form.Label>カテゴリ</Form.Label>
                <Form.Control as="select" name="category">
                    <option></option>
                    {options}
                </Form.Control>
            </Form.Group>
        );
    }

    getCategoryOption(category) {
        return (
            <option>{category}</option>
        );
    }

    render() {
        let categorySelectBox = this.getCategorySelectBox();

        return (
            <Container>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Form method="POST">
                            <input type="hidden" name="process" value="register_category"></input>
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
                <br />
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Form method="POST">
                            <input type="hidden" name="process" value="change_category"></input>
                            {getCsrfTokenTag()}
                            {categorySelectBox}
                            <Form.Group controlId="id_name">
                                <Form.Label>新しいカテゴリ名</Form.Label>
                                <Form.Control name="name" type="text" placeholder="新しいカテゴリ名を入力してください" maxlength="150" required />
                            </Form.Group>
                            <Button variant="info" size="lg" type="submit" block>変更</Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Form method="POST">
                            <input type="hidden" name="process" value="unregister_category"></input>
                            {getCsrfTokenTag()}
                            {categorySelectBox}
                            <Button variant="danger" size="lg" type="submit" block>削除</Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

if (document.getElementsByName('category').length > 0) {
    let categoryTags = document.getElementsByName('category');
    console.dir(categoryTags);
    let categories = [];
    for (let categoryTag of categoryTags) {
        categories.push(categoryTag.value);
    }
    ReactDOM.render(
        <Register categories={categories} />,
        document.getElementById('main')
    );
} else {
    ReactDOM.render(
        <Register categories={[]} />,
        document.getElementById('main')
    );
}