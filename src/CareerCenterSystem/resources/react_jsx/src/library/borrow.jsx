import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Button, Form, Col, Container, Row, Table, InputGroup } from 'react-bootstrap';
import { addHeader } from '../share/csrf.jsx';

class Borrow extends React.Component {
    constructor() {
        super();
        this.state = {
            books: [],
            idList: [],
        };
    }
    
    getCsrfTokenTag() {
        let csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        return (
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken}></input>
        )
    }

    getBooksTable() {
        if (this.state.books.length != 0) {
            let tbody = this.getTbody();
            return (
                <Container>
                    <br />
                    <Row>

                    </Row>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} sx={12}>
                            <Table striped bordered hover>
                                <thead>
                                    <th>ID</th>
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
                <td>{book["id"]}</td>
                <td>{book["title"]}</td>
                <td>{book["category"]}</td>
                <td>{book["publisher"]}</td>
                <td><Button onClick={() => this.deleteBook(idx)}>削除</Button></td>
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

    requestBook() {
        addHeader(request.post(""))
            .send({
                "book_id": document.getElementById("book_id").value,
                "process": "add_book",
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
                            "id": res.body["book_id"],
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

    render() {
        let csrfTokenTag = this.getCsrfTokenTag();
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
                                <Button variant="info" onClick={() => this.requestBook()} block>追加</Button>
                            </Col>
                        </Row>
                        {booksTable}
                        <Form method="POST">
                            {csrfTokenTag}
                            <Button variant="success" size="lg" type="submit" block>貸出申請</Button>
                        </Form>
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