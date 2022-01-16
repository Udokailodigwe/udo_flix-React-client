import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button, Form, Container, Nav, Navbar, Badge, Card } from 'react-bootstrap';
import Images1 from '../image/image1.jpg';
import Images2 from '../image/image2.jpg';
import Images3 from '../image/image3.jpg';

import './login-view.scss';

export function LoginView(props) {
    //store fields with updated fields for reuse in form  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    //validating user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username required');
            isReq = false;
        } else if (username.length < 3) {
            setUsernameErr('Username must be 3 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password required');
            isReq = false;
        } else if (password.length < 4) {
            setPasswordErr('Password should be more than 4 characters');
            isReq = false;
        }
        return isReq;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();// calling validating function above into login handle function
        if (isReq) {
            /* Send a request to the server for authentication */
            axios.post('https://udo-flix.herokuapp.com/login', {
                username: username,
                password: password
            })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    console.log('user does not exist')
                    alert('Please enter a correct username and/or password');
                });

        }
    };

    return (
        <div className="login-view text-light">
            <Container fluid variant="dark" className="container-login">
                <Card>
                    <Card.Body>

                        <Card.Title className="text-center" >Welcome to UDO-FLIX Movie Site</Card.Title>
                        <Card.Subtitle className="text-muted text-center">Please Login</Card.Subtitle>
                        <Form>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username here" />
                                {usernameErr && <p>{usernameErr}</p>}
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password here" />
                                {passwordErr && <p>{passwordErr}</p>}
                            </Form.Group>
                            <br />
                            <button className="login-button" size="sm" type='submit' onClick={handleSubmit}>Submit</button>
                            <span className="regieter-link" > Don't have an account?
                                <a href="/register" > Register Here</a>
                            </span>
                        </Form>
                    </Card.Body>
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
