import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';

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

ReactDOM.render(
    <Home />,
    document.getElementById('main')
);