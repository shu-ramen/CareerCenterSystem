import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Container, Button, Table } from 'react-bootstrap';

class Search extends React.Component {
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
            <Form.Group controlId="id_category">
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
                                <Form.Label>書籍名</Form.Label>
                                <Form.Control name="title" type="text" placeholder="書籍名を入力してください" maxlength="256" />
                            </Form.Group>
                            {categorySelectBox}
                            <Form.Group controlId="id_publisher">
                                <Form.Label>出版社</Form.Label>
                                <Form.Control name="publisher" type="text" placeholder="出版社を入力してください" maxlength="256" />
                            </Form.Group>
                            <Button variant="success" size="lg" type="submit" block>検索</Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

class Result extends React.Component {
    constructor() {
        super();
    }

    getTbody() {
        let trs = this.props.results.map((result) => this.getTr(result));
        return (
            <tbody>
                {trs}
            </tbody>
        )
    }

    getTr(result) {
        return (
            <tr>
                <td>{result["id"]}</td>
                <td>{result["title"]}</td>
                <td>{result["category"]}</td>
                <td>{result["publisher"]}</td>
            </tr>
        )
    }

    render() {
        let tbody = this.getTbody();

        return (
            <Container>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Table striped bordered hover>
                            <thead>
                                <th>#</th>
                                <th>タイトル</th>
                                <th>カテゴリ</th>
                                <th>出版社</th>
                            </thead>
                            {tbody}
                        </Table>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

if (document.getElementsByName('result').length > 0) {
    let resultTags = document.getElementsByName('result')
    let results = []
    for (let resultTag of resultTags) {
        results.push({
            "id": resultTag.children[0].value,
            "title": resultTag.children[1].value,
            "category": resultTag.children[2].value,
            "publisher": resultTag.children[3].value
        });
    }
    ReactDOM.render(
        <Result results={results} />,
        document.getElementById('result_table')
    );
}

if (document.getElementsByName('category').length > 0) {
    let categoryTags = document.getElementsByName('category');
    let categories = [];
    for (let categoryTag of categoryTags) {
        categories.push(categoryTag.value);
    }
    ReactDOM.render(
        <Search categories={categories} />,
        document.getElementById('main')
    );
} else {
    ReactDOM.render(
        <Search categories={[]} />,
        document.getElementById('main')
    );
}