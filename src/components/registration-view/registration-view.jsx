import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';


export function RegistrationView(props) {
    //store fields with updated fields for reuse in form  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://udo-flix.herokuapp.com/users', {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        })
            .then(response => {
                const user = response.data;
                console.log(user)
                window.open('/', '_self'); //redirect user to homepage
            })
            .catch(e => {
                console.log('cannot register user due to error')
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Please register to access udo_flix</Card.Title>
                                <Form>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        reqired
                                        placeholder="Enter a username"
                                    />
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        reqired
                                        minLength="8"
                                        placeholder="Password must contain 8 or more characters"
                                    />
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        reqired
                                        placeholder="Enter your email here"
                                    />
                                    <Button variant="primary" type='submit' onClick={handleSubmit}>Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col >
            </Row >
        </Container >

    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string
    })
};