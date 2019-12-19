import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonToolbar, ButtonGroup, Nav, Navbar, NavDropdown  } from 'react-bootstrap';

class Header extends React.Component {
    constructor() {
        super();
    }

    getNavbarContent(authenticated) {
        if (authenticated) {
            return (
                <Nav className="mr-auto">
                    <Nav.Link href="/">トップページ</Nav.Link>
                    <NavDropdown title="システム" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/library">図書システム</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            );
        }
        else {
            return (
                <Nav className="mr-auto">
                </Nav>
            );
        }
    }

    getNavbarForm(authenticated) {
        if (authenticated) {
            return (
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button variant="outline-secondary" href="#">{this.props.username}</Button>
                        <Button variant="outline-secondary" href="/accounts/password/change/">パスワード変更</Button>
                        <Button variant="outline-danger" href="/accounts/logout/">ログアウト</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            );
        }
        else {
            return (
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button variant="outline-primary" href="/accounts/login/">ログイン</Button>
                        <Button variant="outline-success" href="/accounts/signup/">新規登録</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            );
        }
    }
    
    render() {
        let navbarContent = this.getNavbarContent(this.props.authenticated);
        let navbarForm = this.getNavbarForm(this.props.authenticated);

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">CareerCenterSystem</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {navbarContent}
                    {navbarForm}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

if (document.getElementById('authenticated-header') != null) {
    let username = document.getElementById('authenticated-header').textContent;
    ReactDOM.render(
        <Header authenticated={true} username={username} />,
        document.getElementById('authenticated-header')
    );
}

if (document.getElementById('not-authenticated-header') != null) {
    ReactDOM.render(
        <Header authenticated={false} />,
        document.getElementById('not-authenticated-header')
    );
}