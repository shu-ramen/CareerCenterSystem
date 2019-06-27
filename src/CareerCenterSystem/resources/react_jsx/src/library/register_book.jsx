import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Container, Button, Input } from 'react-bootstrap';

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
        let csrfTokenTag = this.getCsrfTokenTag();
        let categorySelectBox = this.getCategorySelectBox();
        
        return (
            <Container>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Form method="POST">
                            {csrfTokenTag}
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
                        <Form>
                            {csrfTokenTag}
                            <Form.Group controlId="id_title">
                                <Form.Label>インポートするCSVファイル</Form.Label>
                                <Form.Control name="title" type="file" placeholder="ファイルをドラッグしてください" maxlength="256" required />
                            </Form.Group>
                            <Button variant="success" size="lg" type="submit" block>一括登録（未完成）</Button>
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