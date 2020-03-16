import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Button, Card, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { addHeader } from '../share/csrf.jsx';

class Borrow extends React.Component {
    constructor() {
        super();
        this.state = {
            books: [],
            idList: [],
            isLoading: false,
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
                <Container>
                    <br />
                    <Row>
                        <h5>借りたい図書を１冊ずつ追加してください．図書は一度に複数貸出可能です．</h5>
                    </Row>
                </Container>
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
                <td><Button variant="danger" onClick={() => this.deleteBook(idx)} size="sm">取消</Button></td>
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
                        alert("そのIDの本はすでに追加されています");
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
        this.setState({
            isLoading: true
        });
        if (this.state.books.length == 0) {
            alert("少なくとも１冊の本を選択してください");
            this.setState({
                isLoading: false
            });
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
                this.setState({
                    isLoading: false
                });
            }.bind(this));
    }

    render() {
        let booksTable = this.getBooksTable();
        const { isLoading } = this.state;

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
                    <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                        <Card border="dark" text="black" style={{ borderWidth: '2px' }}>
                            <Card.Header as="h4">図書の貸出方法</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    １．借りたい図書の書籍IDを入力する。<br />
                                    ２．追加ボタンを押す。<br />
                                    ３．１と２を繰り返し、借りたい書籍を貸出リストにすべて追加する。<br />
                                    ４．貸出申請ボタンを押す。
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                    <Col></Col>
                </Row>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        {/* <Row>
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
                        </Row> */}
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
                        <br />
                        <Row>
                            <Button
                                variant="success"
                                size="lg"
                                disabled={isLoading}
                                onClick={!isLoading ? () => this.borrow_request() : null}
                                block
                            >
                                {isLoading ? "申請中..." : "貸出申請"}
                            </Button>
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