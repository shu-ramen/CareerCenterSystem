import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Container, Form,  Row, Table } from 'react-bootstrap';
import { getCsrfTokenTag } from '../share/csrf.jsx';

class Result extends React.Component {
    constructor() {
        super();
    }

    getTbody() {
        let trs = this.props.results.map((result) => this.getTr(result));
        return (
            <tbody id="result_tbody">
                {trs}
            </tbody>
        );
    }

    getTr(result) {
        return (
            <tr>
                <td>{result["id"]}</td>
                <td>{result["username"]}</td>
                <td>{result["name"]}</td>
                <td>{result["email"]}</td>
                <td>{result["phone"]}</td>
                <td>{result["book_id"]}</td>
                <td>{result["control_number"]}</td>
                <td>{result["title"]}</td>
                <td>{result["category"]}</td>
                <td>{result["publisher"]}</td>
                <td>{result["process"]}</td>
                <td>{result["timestamp"]}</td>
                <td>{result["deadline"]}</td>
            </tr>
        );
    }

    render() {
        let tbody = this.getTbody();

        return (
            <Container fluid>
                <br />
                <Row>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}></Col>
                    <Col xl={4} lg={4} md={4} sm={12} sx={12}>
                        <Form method="POST">
                            {getCsrfTokenTag()}
                            <Button variant="success" type="submit" block>ダウンロード</Button>
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} sx={12}>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <th>ID</th>
                                <th>学籍番号</th>
                                <th>氏名</th>
                                <th>メールアドレス</th>
                                <th>電話番号</th>
                                <th>図書ID</th>
                                <th>管理番号</th>
                                <th>書籍名</th>
                                <th>カテゴリ</th>
                                <th>出版社</th>
                                <th>処理</th>
                                <th>実行日</th>
                                <th>返却期限</th>
                            </thead>
                            {tbody}
                        </Table>
                    </Col>
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
            "id": resultTag.children[0].value,
            "username": resultTag.children[1].value,
            "name": resultTag.children[2].value,
            "email": resultTag.children[3].value,
            "phone": resultTag.children[4].value,
            "book_id": resultTag.children[5].value,
            "control_number": resultTag.children[6].value,
            "title": resultTag.children[7].value,
            "category": resultTag.children[8].value,
            "publisher": resultTag.children[9].value,
            "process": resultTag.children[10].value,
            "timestamp": resultTag.children[11].value,
            "deadline": resultTag.children[12].value
        });
    }
    ReactDOM.render(
        <Result results={results} />,
        document.getElementById('result_table')
    );
}