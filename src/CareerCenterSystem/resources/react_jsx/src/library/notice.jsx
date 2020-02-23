import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Button, Col, Container, Form, Row, Tab, Tabs, Table } from 'react-bootstrap';
import { addHeader, getCsrfTokenTag } from '../share/csrf.jsx';

class Notice extends React.Component {
    constructor() {
        super();
    }

    render() {
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
                        <Tabs defaultActiveKey={this.props.tab} id="notice_tab">
                            <Tab eventKey="add" title="追加">
                                <br />
                                <Form method="POST">
                                    {getCsrfTokenTag()}
                                    <input type="hidden" name="process" value="add"></input>
                                    <Form.Group controllId="id_content">
                                        <Form.Label>お知らせ内容</Form.Label>
                                        <Form.Control name="content" as="textarea" rows="5" required></Form.Control>
                                    </Form.Group>
                                    <Form.Group controllId="id_is_important">
                                        <Form.Label>お知らせの種類</Form.Label>
                                        <Form.Control name="is_important" as="select">
                                            <option>通常</option>
                                            <option>重要</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="success" size="lg" type="submit" block>追加</Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="delete" title="削除">
                                <br />
                                <NoticeTable notices={this.props.notices} />
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

class NoticeTable extends React.Component {
    constructor() {
        super();
    }

    getTbody() {
        let trs = this.props.notices.map((notice, idx) => this.getTr(notice, idx));
        return (
            <tbody id="notice_tbody">
                {trs}
            </tbody>
        );
    }

    getTr(notice, idx) {
        let button = this.getButton(notice["notice_id"], idx);
        return (
            <tr>
                <td>{notice["notice_id"]}</td>
                <td>{notice["content"]}</td>
                <td>{notice["is_important"]}</td>
                <td>{button}</td>
            </tr>
        );
    }

    getButton(notice_id, idx) {
        return (
            <Button variant="danger" onClick={() => this.delete_notice_request(notice_id, idx)} size="sm">削除</Button>
        )
    }

    delete_notice_request(notice_id, idx) {
        let confirmation = confirm("本当に削除してもよろしいですか？");
        if (confirmation) {
            addHeader(request.post(""))
                .send({
                    "notice_id": notice_id,
                    "process": "delete"
                })
                .end(function (err, res) {
                    if (err) {
                        alert(res.text);
                    }
                    if (res.body["success"]) {
                        alert(res.body["message"]);
                        let tbody = document.getElementById("notice_tbody");
                        ReactDOM.render(<div>削除済</div>, tbody.children[idx].children[3]);
                    } else {
                        alert(res.body["message"]);
                    }
                }.bind(this));
        }
    }

    render() {
        let tbody = this.getTbody();
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <th>ID</th>
                    <th>内容</th>
                    <th>種類</th>
                    <th>処理</th>
                </thead>
                {tbody}
            </Table>
        );
    }
}


let tab = document.getElementsByName('tab')[0].value;
let notices = [];
if (document.getElementsByName('notice').length > 0) {
    let noticeTags = document.getElementsByName('notice');
    for (let noticeTag of noticeTags) {
        notices.push({
            "notice_id": noticeTag.children[0].value,
            "content": noticeTag.children[1].value,
            "is_important": noticeTag.children[2].value
        });
    }
}

ReactDOM.render(
    <Notice tab={tab} notices={notices} />,
    document.getElementById('main')
);