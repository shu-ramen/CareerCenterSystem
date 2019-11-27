import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { addHeader, getCsrfTokenTag } from '../share/csrf.jsx';

class Register extends React.Component {
    constructor() {
        super();
    }

    getCategorySelectBox() {
        let options = this.props.categories.map((category) => this.getCategoryOption(category));
        return (
            <Form.Group controlId="id_category" required>
                <Form.Label>カテゴリ</Form.Label>
                <Form.Control as="select" id="category" name="category">
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

    deleteCategory() {
        let category_name = document.getElementById("category-delete").childNodes[0].childNodes[1].value;
        if (category_name == "") {
            alert("削除するカテゴリを選択してください");
            return;
        }

        let confirmation = confirm("本当にカテゴリ【" + category_name + "】を削除してもよろしいですか？※登録直後のカテゴリは削除できません．一度別画面に遷移してから削除してください．");
        if (confirmation) {
            addHeader(request.post(""))
                .send({
                    "category": category_name,
                    "process": "delete_category"
                })
                .end(function (err, res) {
                    if (err) {
                        alert(res.text);
                    }
                    if (res.body["success"]) {
                        alert(res.body["message"]);
                        window.location.reload();
                    } else {
                        alert("削除処理に失敗しました");
                    }
                }.bind(this));
        }
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
                        <div id="category-delete">
                            {categorySelectBox}
                        </div>
                        <Button variant="danger" size="lg" onClick={() => this.deleteCategory()} block>削除</Button>
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