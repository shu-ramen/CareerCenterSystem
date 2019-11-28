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
        let body = this.props.messages.map((message) => this.getMessageTag(message));
        return body;
    }

    getMessageTag(message) {
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