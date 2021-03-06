import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { addHeader, getCsrfTokenTag } from '../share/csrf.jsx';

class Search extends React.Component {
    constructor() {
        super();
    }

    getCategorySelectBox() {
        let options = this.props.categories.map((category) => this.getCategoryOption(category));
        return (
            <Form.Group controlId="id_category">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>カテゴリ</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control as="select" name="category">
                        <option></option>
                        {options}
                    </Form.Control>
                </InputGroup>
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
                        <Button variant="outline-secondary" href="/library">図書システムトップへ戻る</Button>
                    </Col>
                    <Col></Col>
                </Row>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Form method="POST">
                            {getCsrfTokenTag()}
                            <input type="hidden" name="process" value="search"></input>
                            <Form.Group controlId="id_control_number">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>管理番号</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control name="control_number" type="text" placeholder="管理番号を入力してください" maxlength="16" />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="id_title">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>書籍名</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control name="title" type="text" placeholder="書籍名を入力してください" maxlength="256" />
                                </InputGroup>
                            </Form.Group>
                            {categorySelectBox}
                            <Form.Group controlId="id_publisher">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>出版社</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control name="publisher" type="text" placeholder="出版社を入力してください" maxlength="256" />
                                </InputGroup>
                            </Form.Group>
                            <Button variant="success" size="lg" type="submit" block>検索</Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

class Result extends React.Component {
    constructor() {
        super();
    }

    getTbody() {
        let trs = this.props.results.map((result, idx) => this.getTr(result, idx));
        return (
            <tbody id="result_tbody">
                {trs}
            </tbody>
        );
    }

    getTr(result, idx) {
        let status = this.getStatus(result["borrowable"], result["is_active"]);
        let button = this.getButton(result["book_id"], result["borrowable"], result["is_active"], idx);
        return (
            <tr>
                <td>{result["book_id"]}</td>
                <td>{result["control_number"]}</td>
                <td>{result["title"]}</td>
                <td>{result["category"]}</td>
                <td>{result["publisher"]}</td>
                <td>{status}</td>
                <td>{button}</td>
            </tr>
        );
    }

    getStatus(borrowable, is_active) {
        if (is_active == "True") {
            if (borrowable == "True") {
                return "";
            } else {
                return "貸出中";
            }
        } else {
            return "廃棄済";
        }
    }

    getButton(book_id, borrowable, is_active, idx) {
        if (is_active == "True") {
            if (borrowable == "True") {
                return (
                    <Button variant="danger" onClick={() => this.unregister_book_request(book_id, idx)} size="sm">廃棄</Button>
                );
            } else {
                return (
                    <div></div>
                );
            }
        } else {
            return (
                <Button variant="primary" onClick={() => this.register_book_request(book_id, idx)} size="sm">復元</Button>
            );
        }
    }

    unregister_book_request(book_id, idx) {
        let confirmation = confirm("本当に破棄してもよろしいですか？");
        if (confirmation) {
            addHeader(request.post(""))
                .send({
                    "book_id": book_id,
                    "process": "unregister_book_request"
                })
                .end(function (err, res) {
                    if (err) {
                        alert(res.text);
                    }
                    if (res.body["success"]) {
                        alert(res.body["message"]);
                        let tbody = document.getElementById("result_tbody");
                        ReactDOM.render(<div>廃棄済</div>, tbody.children[idx].children[5]);
                        ReactDOM.render(this.getButton(book_id, "False", "False", idx), tbody.children[idx].children[6]);
                    } else {
                        alert(res.body["message"]);
                    }
                }.bind(this));
        }
    }

    register_book_request(book_id, idx) {
        let confirmation = confirm("本当に復元してもよろしいですか？");
        if (confirmation) {
            addHeader(request.post(""))
                .send({
                    "book_id": book_id,
                    "process": "register_book_request"
                })
                .end(function (err, res) {
                    if (err) {
                        alert(res.text);
                    }
                    if (res.body["success"]) {
                        alert(res.body["message"]);
                        let tbody = document.getElementById("result_tbody");
                        ReactDOM.render(<div>復元済</div>, tbody.children[idx].children[5]);
                        ReactDOM.render(this.getButton(book_id, "True", "True", idx), tbody.children[idx].children[6]);
                    } else {
                        alert(res.body["message"]);
                    }
                }.bind(this));
        }
    }

    render() {
        let tbody = this.getTbody();

        return (
            <Container>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={12} lg={12} md={12} sm={12} sx={12}>
                        <Table striped bordered hover>
                            <thead>
                                <th>図書ID</th>
                                <th>管理番号</th>
                                <th>書籍名</th>
                                <th>カテゴリ</th>
                                <th>出版社</th>
                                <th>貸出状態</th>
                                <th>処理</th>
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
    let resultTags = document.getElementsByName('result');
    let results = []
    for (let resultTag of resultTags) {
        results.push({
            "book_id": resultTag.children[0].value,
            "control_number": resultTag.children[1].value,
            "title": resultTag.children[2].value,
            "category": resultTag.children[3].value,
            "publisher": resultTag.children[4].value,
            "borrowable": resultTag.children[5].value,
            "is_active": resultTag.children[6].value
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