import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';

class Borrow extends React.Component {
    constructor() {
        super();
    }
    
    getCsrfTokenTag() {
        let csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        return (
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken}></input>
        )
    }

    render() {
        let csrfTokenTag = this.getCsrfTokenTag();
        if (this.props.book != null) {
            console.log(book["id"]);
        }

        return (
            <Container>
                <br />
                <Row>
                    <Col></Col>
                    <Col xl={8} lg={8} md={8} sm={12} sx={12}>
                        <Form method="POST">
                            {csrfTokenTag}
                            <Form.Row>
                                <Form.Group as={Col} controlId="id_book_id">
                                    <Form.Control name="book_id" type="text" placeholder="借りたい本のIDを入力してください"></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="id_book_id">
                                    <Button variant="info" type="submit" block>追加</Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
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

if (document.getElementsByName('book').length > 0) {
    let bookTag = document.getElementsByName('result');
    let book = {
        "id": bookTag.children[0].value,
        "title": bookTag.children[1].value,
        "category": bookTag.children[2].value,
        "publisher": bookTag.children[3].value
    };
    ReactDOM.render(
        <Borrow book={book} />,
        document.getElementById('main')
    );
} else {
    ReactDOM.render(
        <Borrow book={null} />,
        document.getElementById('main')
    );
}