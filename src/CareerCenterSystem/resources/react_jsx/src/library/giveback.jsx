import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { getCsrfTokenTag } from '../share/csrf.jsx';

class BorrowTable extends React.Component {
    constructor() {
        super();
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
                <td>{borrow["control_number"]}</td>
                <td>{borrow["title"]}</td>
                <td>{borrow["category"]}</td>
                <td>{borrow["publisher"]}</td>
                <td>{borrow["timestamp"]}</td>
                <td>
                    <Form method="POST">
                        {getCsrfTokenTag()}
                        <input type="hidden" name="book_id" value={borrow["book_id"]}></input>
                        <Button variant="info" type="submit" size="sm">返却</Button>
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
                    <Col xl={12} lg={12} md={12} sm={12} sx={12}>
                        <Table striped bordered hover>
                            <thead>
                                <th>図書ID</th>
                                <th>管理番号</th>
                                <th>書籍名</th>
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
            "control_number": borrowTag.children[1].value,
            "title": borrowTag.children[2].value,
            "category": borrowTag.children[3].value,
            "publisher": borrowTag.children[4].value,
            "timestamp": borrowTag.children[5].value,
        });
    }
    ReactDOM.render(
        <BorrowTable borrowList={borrowList} />,
        document.getElementById('borrow_table')
    );
} else {
    ReactDOM.render(
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
                        <Alert variant="warning">現在貸出中の図書はありません</Alert>
                    </Col>
                <Col></Col>
            </Row>
        </Container>,
        document.getElementById('borrow_table')
    );
}