import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Button, Col, Container, Form,  Row, Table } from 'react-bootstrap';
import { addHeader, getCsrfTokenTag } from '../share/csrf.jsx';

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
        let button = this.getButton(result["book_id"], result["username"], idx);
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
                <td>{button}</td>
            </tr>
        );
    }

    getButton(book_id, username, idx) {
        if (this.props.target == "recent") {
            return (
                <Button variant="danger" onClick={() => this.giveback_book(book_id, username, idx)} size="sm">返却</Button>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    giveback_book(book_id, username, idx) {
        let confirmation = confirm("本当に返却してもよろしいですか？");
        if (confirmation) {
            addHeader(request.post(""))
                .send({
                    "book_id": book_id,
                    "username": username,
                    "process": "giveback_book"
                })
                .end(function (err, res) {
                    if (err) {
                        alert(res.text);
                    }
                    if (res.body["success"]) {
                        alert(res.body["message"]);
                        let tbody = document.getElementById("result_tbody");
                        ReactDOM.render(<div>返却済</div>, tbody.children[idx].children[13]);
                    } else {
                        alert(res.body["message"]);
                    }
                }.bind(this));
        }
    }

    render() {
        if (this.props.results.length > 0) {
            let tbody = this.getTbody();

            return (
                <Container fluid>
                    <br />
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                            <Button variant="outline-secondary" href="/library">図書システムトップへ戻る</Button>
                        </Col>
                        <Col xl={4} lg={4} md={4} sm={12} sx={12}>
                            <Form method="POST">
                                {getCsrfTokenTag()}
                                <input type="hidden" name="process" value="download"></input>
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
                <Container fluid>
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
                            現在貸出中の書籍はありません．
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            );
        }
    }
}

let target = "past";
if (document.getElementsByName('target').length > 0) {
    target = document.getElementsByName('target')[0].value;
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
        <Result results={results} target={target} />,
        document.getElementById('result_table')
    );
}
else {
    ReactDOM.render(
        <Result results={[]} target={target} />,
        document.getElementById('result_table')
    );
}