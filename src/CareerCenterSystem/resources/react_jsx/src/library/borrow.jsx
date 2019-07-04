import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { addHeader } from '../share/csrf.jsx';

class Borrow extends React.Component {
    constructor() {
        super();
        this.state = {
            books: [],
            idList: [],
        };
    }

    getBooksTable() {
        if (this.state.books.length != 0) {
            let tbody = this.getTbody();
            return (
                <Container>
                    <br />
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} sx={12}>
                            <Table striped bordered hover>
                                <thead>
                                    <th>図書ID</th>
                                    <th>管理番号</th>
                                    <th>タイトル</th>
                                    <th>カテゴリ</th>
                                    <th>出版社</th>
                                    <th>処理</th>
                                </thead>
                                {tbody}
                            </Table>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <div></div>
            )
        }
    }

    getTbody() {
        let trs = this.state.books.map((book, idx) => this.getTr(book, idx));
        return (
            <tbody>
                {trs}
            </tbody>
        )
    }

    getTr(book, idx) {
        return (
            <tr>
                <td>{book["book_id"]}</td>
                <td>{book["control_number"]}</td>
                <td>{book["title"]}</td>
                <td>{book["category"]}</td>
                <td>{book["publisher"]}</td>
                <td><Button variant="danger" onClick={() => this.deleteBook(idx)} size="sm">削除</Button></td>
            </tr>
        )
    }

    deleteBook(idx) {
        let temp_books = this.state.books;
        let temp_idList = this.state.idList;
        temp_books.splice(idx, 1);
        temp_idList.splice(idx, 1);
        this.setState({
            books: temp_books,
            idList: temp_idList,
        });
    }

    requestBookWithId() {
        addHeader(request.post(""))
            .send({
                "book_id": document.getElementById("book_id").value,
                "process": "add_book_id",
            })
            .end(function (err, res) {
                if (err) {
                    alert(res.text);
                }
                if (res.body["success"]) {
                    if (this.state.idList.indexOf(res.body["book_id"]) == -1) {
                        let temp_books = this.state.books;
                        let temp_idList = this.state.idList;
                        temp_books.push({
                            "book_id": res.body["book_id"],
                            "control_number": res.body["control_number"],
                            "title": res.body["book_title"],
                            "category": res.body["book_category"],
                            "publisher": res.body["book_publisher"],
                        });
                        temp_idList.push(res.body["book_id"]);
                        this.setState({
                            books: temp_books,
                            idList: temp_idList,
                        });
                    } else {
                        alert("そのIDの本はすでに追加されています")
                    }
                } else {
                    alert(res.body["message"]);
                }
            }.bind(this));
    }

    requestBookWithControlNumber() {
        addHeader(request.post(""))
            .send({
                "control_number": document.getElementById("control_number").value,
                "process": "add_book_control_number",
            })
            .end(function (err, res) {
                if (err) {
                    alert(res.text);
                }
                if (res.body["success"]) {
                    if (this.state.idList.indexOf(res.body["book_id"]) == -1) {
                        let temp_books = this.state.books;
                        let temp_idList = this.state.idList;
                        temp_books.push({
                            "book_id": res.body["book_id"],
                            "control_number": res.body["control_number"],
                            "title": res.body["book_title"],
                            "category": res.body["book_category"],
                            "publisher": res.body["book_publisher"],
                        });
                        temp_idList.push(res.body["book_id"]);
                        this.setState({
                            books: temp_books,
                            idList: temp_idList,
                        });
                    } else {
                        alert("そのIDの本はすでに追加されています")
                    }
                } else {
                    alert(res.body["message"]);
                }
            }.bind(this));
    }

    borrow_request() {
        if (this.state.books.length == 0) {
            alert("少なくとも１冊の本を選択してください");
            return;
        }
        addHeader(request.post(""))
            .send({
                "books": this.state.books,
                "process": "borrow_request"
            })
            .end(function (err, res) {
                if (err) {
                    alert(res.text);
                }
                if (res.body["success"]) {
                    alert(res.body["message"]);
                    this.setState({
                        books: [],
                        idList: [],
                    })
                }
            }.bind(this));
    }

    render() {
        let booksTable = this.getBooksTable();

        return (
            <Container>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Row>
                            <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>図書ID</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control id="book_id" />
                                </InputGroup>
                            </Col>
                            <Col xl={4} lg={4} md={4} sm={12} sx={12}>
                                <Button variant="info" onClick={() => this.requestBookWithId()} block>追加</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>管理番号</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control id="control_number" />
                                </InputGroup>
                            </Col>
                            <Col xl={4} lg={4} md={4} sm={12} sx={12}>
                                <Button variant="info" onClick={() => this.requestBookWithControlNumber()} block>追加</Button>
                            </Col>
                        </Row>
                        {booksTable}
                        <Row>
                            <Button variant="success" size="lg" onClick={() => this.borrow_request()} block>貸出申請</Button>
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

ReactDOM.render(
    <Borrow />,
    document.getElementById('main')
);