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
                            {getCsrfTokenTag()}
                            <input type="hidden" name="process" value="register_book"></input>
                            <Form.Group controlId="id_control_number">
                                <Form.Label>管理番号</Form.Label>
                                <Form.Control name="control_number" type="text" placeholder="管理番号を入力してください" maxlength="16" required />
                            </Form.Group>
                            <Form.Group controlId="id_title">
                                <Form.Label>タイトル</Form.Label>
                                <Form.Control name="title" type="text" placeholder="タイトルを入力してください" maxlength="256" required />
                            </Form.Group>
                            {categorySelectBox}
                            <Form.Group controlId="id_publisher">
                                <Form.Label>出版社</Form.Label>
                                <Form.Control name="publisher" type="text" placeholder="出版社を入力してください" maxlength="256" required />
                            </Form.Group>
                            <Button variant="success" size="lg" type="submit" block>登録</Button>
                        </Form>
                        <br />
                        <Form method="POST" enctype="multipart/form-data">
                            {getCsrfTokenTag()}
                            <input type="hidden" name="process" value="register_book_file"></input>
                            <Form.Group controlId="id_file">
                                <Form.Label>インポートするCSVファイル</Form.Label>
                                <Form.Control name="file" type="file" required />
                            </Form.Group>
                            <Button variant="info" size="lg" type="submit" block>一括登録（未完成）</Button>
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