import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, Form, Container, Nav, Navbar, Badge, Card } from 'react-bootstrap';
import Images1 from '../image/image1.jpg';
import Images2 from '../image/image2.jpg';
import Images3 from '../image/image3.jpg';

export function LoginView(props) {
    //store fields with updated fields for reuse in form  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
        <div className="login-view">
            <Navbar expand="lg" fixed="top" bg="dark" className="navbar-loginview">
                <Container>
                    <Navbar.Brand href="#home"><Badge bg="light" text="danger">UDO_FLIX</Badge></Navbar.Brand>
                    <Nav className="nav-loginview">
                        <Nav.Link href="#Previews"><Badge pill bg="danger" text="light">Movie Preview</Badge></Nav.Link>
                        <Nav.Link href="#Login"><Badge pill bg="danger" text="light">Log In</Badge></Nav.Link>
                        <Nav.Link href="#Register"><Badge pill bg="danger" text="light">Register</Badge></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <br />

            <Container fluid variant="dark" className="container-login">
                <Card>
                    <Card.Body>

                        <Card.Title className="text-center" >Welcome to UDO-FLIX Movie Site</Card.Title>
                        <Card.Subtitle className="text-muted text-center">Please Login</Card.Subtitle>
                        <Form>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username here" />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password should not be less than 8 characters" />
                            </Form.Group>
                            <br />
                            <Button className="text-center" size="sm" variant="dark" type='submit' onClick={handleSubmit}>Submit</Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer className="text-center"> Don't have an account?
                        <Card.Link href="#register">Register Here</Card.Link>
                    </Card.Footer>
                </Card>
                <Card.Img src={Images1} style={{ width: "22.5rem", height: "20rem" }} alt="movie images" />
                <Card.Img src={Images2} style={{ width: "22.5rem", height: "20rem" }} alt="movie images" />
                <Card.Img src={Images3} style={{ width: "22.5rem", height: "20rem" }} alt="movie images" />
            </Container>

        </div >

    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};
