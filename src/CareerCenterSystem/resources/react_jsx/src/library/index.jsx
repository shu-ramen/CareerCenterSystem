import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

class Index extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <br />
                        <h4>学生向けツール</h4>
                        <br />
                    </Col>
                </Row>
                <Row>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Card bg="success" text="white" style={{ width: '100%' }}>
                            <Card.Header as="h5">図書検索</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    図書の検索を行います．
                                </Card.Text>
                                <Button variant="success" href="search/" block>実行</Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Card bg="success" text="white" style={{ width: '100%' }}>
                            <Card.Header as="h5">図書貸出</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    図書の貸出を行います．
                                </Card.Text>
                                <Button variant="success" href="borrow/" block>実行</Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Card bg="success" text="white" style={{ width: '100%' }}>
                            <Card.Header as="h5">図書返却</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    図書の返却を行います．
                                </Card.Text>
                                <Button variant="success" href="giveback/" block>実行</Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <h4>管理者向けツール</h4>
                        <br />
                    </Col>
                </Row>
                <Row>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Card bg="dark" text="white" style={{ width: '100%' }}>
                            <Card.Header as="h5">カテゴリ登録・削除</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    カテゴリの登録や削除を行います．
                                </Card.Text>
                                <Button variant="dark" href="register/category/" block>実行</Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Card bg="dark" text="white" style={{ width: '100%' }}>
                            <Card.Header as="h5">図書登録</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    図書の登録を行います．
                                </Card.Text>
                                <Button variant="dark" href="register/book/" block>実行</Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Card bg="dark" text="white" style={{ width: '100%' }}>
                            <Card.Header as="h5">図書廃棄</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    図書の廃棄を行います．
                                </Card.Text>
                                <Button variant="dark" href="unregister/book/" block>実行</Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Card bg="dark" text="white" style={{ width: '100%' }}>
                            <Card.Header as="h5">貸出状況確認</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    現在の貸出状況を確認します．
                                </Card.Text>
                                <Button variant="dark" href="status/borrow/recent/" block>実行</Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                        <Card bg="dark" text="white" style={{ width: '100%' }}>
                            <Card.Header as="h5">貸出履歴確認</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    過去の貸出状況を確認します．
                                </Card.Text>
                                <Button variant="dark" href="status/borrow/past/" block>実行</Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                </Row>
            </Container>
        )
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('main')
);