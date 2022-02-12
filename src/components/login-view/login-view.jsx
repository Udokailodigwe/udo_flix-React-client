import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { Stack, Form, Col } from 'react-bootstrap';

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
        <div className="login-view  text-light mt-5">
            <Stack gap={2}>
                <h2 className="text-center mb-5" >Welcome to UDO-FLIX Movie Site</h2>
                <Form>
                    <Col className="mx-auto" xs={8} sm={8} lg={3} xl={3}>
                        <h6 className="text-light text-center">Please Login</h6>
                        <Form.Group controlId="formUsername">
                            <Form.Label className="mt-3">Username:</Form.Label>
                            <Form.Control className="mb-3" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username here" />
                            {usernameErr && <p>{usernameErr}</p>}
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control className="mb-3" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password here" />
                            {passwordErr && <p>{passwordErr}</p>}
                        </Form.Group>
                        <div className="text-center">
                            <button className="login-button" type='submit' onClick={handleSubmit}>
                                Login
                            </button >
                        </div>
                        <p className="text-center" > Don't have an account?
                            <Link to="/register" className="register-link"> Register Here</Link>
                        </p>
                    </Col>
                </Form>
            </Stack >
        </div >

    );
}

const mapDispatchToProps = (dispatch) => ({
    handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);