import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, Container, Form, Row, Tabs, Tab } from 'react-bootstrap';
import { getCsrfTokenTag } from '../share/csrf.jsx';

class Register extends React.Component {
    constructor() {
        super();
    }

    getCategorySelectBox(controlId, selection) {
        let options = this.props.categories.map((category) => this.getCategoryOption(category, selection));
        return (
            <Form.Group controlId={controlId} required>
                <Form.Label>カテゴリ</Form.Label>
                <Form.Control as="select" name="category">
                    <option></option>
                    {options}
                </Form.Control>
            </Form.Group>
        );
    }

    getCategoryOption(category, selection) {
        if (selection==true && category == this.props.category_name) {
            return (
                <option selected>{category}</option>
            );
        } else {
            return (
                <option>{category}</option>
            );
        }
    }

    render() {
        let categorySelectBox1 = this.getCategorySelectBox("id_category", false);
        let categorySelectBox2 = this.getCategorySelectBox("id_category_change", true);
        
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
                        <Tabs defaultActiveKey={this.props.tab} id="register_book_tab">
                            <Tab eventKey="register" title="新規登録">
                                <br />
                                <Form method="POST">
                                    {getCsrfTokenTag()}
                                    <input type="hidden" name="process" value="register_book"></input>
                                    <Form.Group controlId="id_control_number">
                                        <Form.Label>管理番号</Form.Label>
                                        <Form.Control name="control_number" type="text" placeholder="管理番号を入力してください" maxlength="16" required />
                                    </Form.Group>
                                    <Form.Group controlId="id_title">
                                        <Form.Label>書籍名</Form.Label>
                                        <Form.Control name="title" type="text" placeholder="書籍名を入力してください" maxlength="256" required />
                                    </Form.Group>
                                    {categorySelectBox1}
                                    <Form.Group controlId="id_publisher">
                                        <Form.Label>出版社</Form.Label>
                                        <Form.Control name="publisher" type="text" placeholder="出版社を入力してください" maxlength="256" required />
                                    </Form.Group>
                                    <Button variant="success" size="lg" type="submit" block>登録</Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="import_file" title="一括登録">
                                <br />
                                <Form method="POST" enctype="multipart/form-data">
                                    {getCsrfTokenTag()}
                                    <input type="hidden" name="process" value="register_book_file"></input>
                                    <Form.Group controlId="id_file">
                                        <Form.Label>インポートするCSVファイル</Form.Label>
                                        <Form.Control name="file" type="file" accept="text/csv,.csv" required />
                                    </Form.Group>
                                    <Button variant="info" size="lg" type="submit" block>一括登録</Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="export_file" title="エクスポート（CSV）">
                                <br />
                                <Form method="POST">
                                    {getCsrfTokenTag()}
                                    <input type="hidden" name="process" value="export_book_file"></input>
                                    <Button variant="secondary" size="lg" type="submit" block>エクスポート</Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="change" title="登録内容変更">
                                <br />
                                <Form method="POST" enctype="multipart/form-data">
                                    {getCsrfTokenTag()}
                                    <input type="hidden" name="process" value="change_search"></input>
                                    <Form.Group controlId="id_control_number_change_search">
                                        <Form.Label>管理番号</Form.Label>
                                        <Form.Control name="control_number" type="text" placeholder="管理番号を入力してください" maxlength="16" required />
                                    </Form.Group>
                                    <Button variant="info" size="lg" type="submit" block>検索</Button>
                                </Form>
                                <br />
                                <br />
                                <Form method="POST">
                                    {getCsrfTokenTag()}
                                    <input type="hidden" name="process" value="change"></input>
                                    <Form.Group controlId="id_control_number_change">
                                        <Form.Label>管理番号</Form.Label>
                                        <Form.Control name="control_number" type="text" value={this.props.control_number} maxlength="16" readonly="readonly" required />
                                    </Form.Group>
                                    <Form.Group controlId="id_title_change">
                                        <Form.Label>書籍名</Form.Label>
                                        <Form.Control name="title" placeholder={this.props.title} type="text" maxlength="256" />
                                    </Form.Group>
                                    {categorySelectBox2}
                                    <Form.Group controlId="id_publisher_change">
                                        <Form.Label>出版社</Form.Label>
                                        <Form.Control name="publisher" placeholder={this.props.publisher} type="text" maxlength="256"/>
                                    </Form.Group>
                                    <Button variant="success" size="lg" type="submit" block>更新</Button>
                                </Form>
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

let tab = document.getElementsByName('tab')[0].value;
let control_number = "";
let title = "";
let category_name = "";
let publisher = "";
if (document.getElementsByName('change_book').length > 0) {
    control_number = document.getElementsByName('control_number')[0].value;
    title = document.getElementsByName('title')[0].value;
    category_name = document.getElementsByName('category_name')[0].value;
    publisher = document.getElementsByName('publisher')[0].value;
}
let categories = [];
if (document.getElementsByName('category').length > 0) {
    let categoryTags = document.getElementsByName('category');
    for (let categoryTag of categoryTags) {
        categories.push(categoryTag.value);
    }
}

ReactDOM.render(
    <Register
        categories={categories}
        tab={tab}
        control_number={control_number}
        title={title}
        category_name={category_name}
        publisher={publisher}
    />,
    document.getElementById('main')
);