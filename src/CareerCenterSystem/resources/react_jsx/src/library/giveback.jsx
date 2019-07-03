import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Form, Row, Col, Container, Button, Table } from 'react-bootstrap';

class BorrowTable extends React.Component {
    constructor() {
        super();
    }
    
    getCsrfTokenTag() {
        let csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        return (
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken}></input>
        )
    }

    getTbody() {
        let trs = this.props.borrowList.map((borrow) => this.getTr(borrow));
        return (
            <tbody>
                {trs}
            </tbody>
        );
    }

    getTr(borrow) {
        return (
            <tr>
                <td>{borrow["book_id"]}</td>
                <td>{borrow["title"]}</td>
                <td>{borrow["category"]}</td>
                <td>{borrow["publisher"]}</td>
                <td>{borrow["timestamp"]}</td>
                <td>
                    <Form method="POST">
                        {this.getCsrfTokenTag()}
                        <input type="hidden" name="book_id" value={borrow["book_id"]}></input>
                        <Button variant="info" type="submit">返却</Button>
                    </Form>
                </td>
            </tr>
        );
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
                                <th>図書ID</th>
                                <th>タイトル</th>
                                <th>カテゴリ</th>
                                <th>出版社</th>
                                <th>貸出日時</th>
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

if (document.getElementsByName('borrow').length > 0) {
    let borrowTags = document.getElementsByName('borrow');
    let borrowList = [];
    for (let borrowTag of borrowTags) {
        borrowList.push({
            "book_id": borrowTag.children[0].value,
            "title": borrowTag.children[1].value,
            "category": borrowTag.children[2].value,
            "publisher": borrowTag.children[3].value,
            "timestamp": borrowTag.children[4].value,
        });
    }
    ReactDOM.render(
        <BorrowTable borrowList={borrowList} />,
        document.getElementById('borrow_table')
    );
} else {
    ReactDOM.render(
        <Container>
            <Row>
                <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Alert variant="warning">現在貸出中の図書はありません</Alert>
                    </Col>
                <Col></Col>
            </Row>
        </Container>,
        document.getElementById('borrow_table')
    );
}