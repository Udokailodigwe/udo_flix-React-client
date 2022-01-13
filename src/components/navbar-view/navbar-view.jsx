import React from 'react';
import { Navbar, Button, Nav, Container, Badge, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './navbar-view.scss';

export function NavbarView({ user }) {
    onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };


    return (
        <Navbar expand="lg md" fixed="top" bg="dark" variant="dark" className="navbar">
            <Container fluid >
                <Navbar.Brand href="/" className="brand"><Badge bg="light" text="danger">UDO_FLIX</Badge></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse className="justify-content-end nav-collapse">
                    <Nav className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavItem>
                            {isAuth() && (
                                <Nav.Link>
                                    <Link to={`/users/:username`} href="#"><p>Your Profile</p></Link>
                                </Nav.Link>
                            )}
                        </NavItem>
                        <NavItem >
                            {isAuth() && (
                                <Nav.Link >
                                    <p>Welcome: <Link to={`/users/:username`}><span className="user">{user}</span></Link></p>
                                </Nav.Link >
                            )}
                        </NavItem>
                        <Nav.Link>
                            {isAuth() && (
                                <Button className="logout_button" size="md" variant="dark" text="light" onClick={() => { this.onLoggedOut() }} ><p>Logout</p></Button>
                            )}
                        </Nav.Link>
                        <NavItem>
                            {!isAuth() && (
                                <Nav.Link href="/" className="login-signup"><p>Login</p></Nav.Link> //Hide login link if !isAuth
                            )}
                        </NavItem>
                        <NavItem>
                            {!isAuth() && (
                                <Nav.Link href="/register" className="login-signup"><p>Sign-up</p></Nav.Link> //Hide signup link if !isAuth
                            )}
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
