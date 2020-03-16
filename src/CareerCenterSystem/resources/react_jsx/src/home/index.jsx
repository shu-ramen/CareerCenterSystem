import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
                <br />
                <Row>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Card bg="dark" text="white">
                            <Card.Header>図書システム</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    図書の検索・貸出・返却を行います。
                                </Card.Text>
                                <Button variant="dark" href="/library" block>利用</Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Card bg="dark" text="white">
                            <Card.Header>管理システム</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    ユーザーの管理などを行います．管理者権限が必要です．
                                </Card.Text>
                                <Button variant="dark" href="/admin" target="_blank" block>利用</Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Card bg="info" text="white">
                            <Card.Header>アンケート</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    機能改善のために利用アンケートにご協力ください
                                </Card.Text>
                                <Button variant="info" href="https://forms.gle/QjbDkzzYiXPS5yCD8" target="_blank" block>利用</Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                </Row>
            </Container>
        );
    }
}

class News extends React.Component {
    constructor() {
        super();
    }

    getBorder() {
        if (this.props.type == "normal") {
            return "dark";
        }
        else if (this.props.type == "important") {
            return "danger";
        }
    }

    getText() {
        if (this.props.type == "normal") {
            return "black";
        }
        else if (this.props.type == "important") {
            return "black";
        }
    }

    getHeader() {
        if (this.props.type == "normal") {
            return "お知らせ";
        }
        else if (this.props.type == "important") {
            return "重要なお知らせ";
        }
    }

    getBody() {
        let body = this.props.messages.map((message, idx) => this.getMessageTag(message, idx==(this.props.messages.length-1)));
        return body;
    }

    getMessageTag(message, is_last) {
        let messages = message.split("_plus_");
        let messageTags = messages.map((message) => this.getMessage(message));
        if (is_last) {
            return (
                <div>{messageTags}</div>
            );
        }
        else {
            return (
                <div>{messageTags}<hr /></div>
            );
        }
    }

    getMessage(message) {
        return (
            <p>{message}</p>
        );
    }

    render() {
        let border = this.getBorder();
        let text = this.getText();
        let header = this.getHeader();
        let body = this.getBody();

        return (
            <Container>
                <br />
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Card border={border} text={text} style={{ borderWidth: '2px' }}>
                            <Card.Header as="h4">{header}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {body}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                </Row>
            </Container>
        );
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById('main')
);

if (document.getElementsByName('news_message').length > 0) {
    let messageTags = document.getElementsByName('news_message');
    let messages = [];
    for (let messageTag of messageTags) {
        messages.push(messageTag.value);
    }
    ReactDOM.render(
        <News messages={messages} type='normal' />,
        document.getElementById('news')
    );
}

if (document.getElementsByName('important_news_message').length > 0) {
    let messageTags = document.getElementsByName('important_news_message');
    let messages = [];
    for (let messageTag of messageTags) {
        messages.push(messageTag.value);
    }
    ReactDOM.render(
        <News messages={messages} type='important' />,
        document.getElementById('important_news')
    );
}