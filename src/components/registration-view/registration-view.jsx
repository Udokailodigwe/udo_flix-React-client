import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Button, Stack, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './registration-view.scss';


export function RegistrationView(props) {
    //store fields with updated fields for reuse in form  
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    //hooks
    const [values, setValues] = useState({
        nameErr: '',
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
        //birthdayErr: '',
    });


    const validate = () => {
        let isReq = true;
        if (!name) {
            setValues({ ...values, nameErr: 'Name is required' });
            isReq = false;
        } else if (name.length < 2) {
            setValues({ ...values, nameErr: 'Name should be more one character long' });
            isReq = false;
        }
        if (!username) {
            setValues({ ...values, usernameErr: 'Username is required' });
            isReq = false;
        } else if (username.length < 5) {
            setValues({ ...values, usernameErr: 'Username must be 5 characters long' });
            isReq = false;
        }
        if (!password) {
            setValues({ ...values, passwordErr: 'Password is required' });
            isReq = false;
        } else if (password.length < 4) {
            setValues({ ...values, passwordErr: 'Password should be more than 4 characters' });
            isReq = false;
        }
        if (!email) {
            setValues({ ...values, emailErr: 'Email is required' });
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({ ...values, emailErr: 'Email is invalid' });
        }
        // if (!birthday) {
        //     setValues({ ...values, birthdayErr: 'Birth date is required' });
        //     isReq = false;
        //     const d = isDate(); or new Date();
        // } else if (!birthday.d) {
        //     setValues({ ...values, birthdayErr: 'Birth date is invalid' });
        // }
        return isReq
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();//assign isReq variable to validate function
        if (isReq) {
            axios.post('https://udo-flix.herokuapp.com/users', {
                username: username,
                password: password,
                email: email,
                birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration successful, please login!');
                    window.open('/', '_self'); //redirect user to homepage in current tab
                })
                .catch(e => {
                    console.log('cannot register user due to error')
                    alert('Registration not successful');
                });
        }

    };

    return (
        <div className=" reg-container text-light mt-5">
            <Stack>
                <h2 className="text-center mb-5" >Please register to access udo_flix</h2>
                <Form>
                    <Col className="mx-auto" >
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                reqired
                                placeholder="Enter name"
                            />
                            {values.nameErr && <p>{values.nameErr}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                reqired
                                placeholder="Enter a username"
                            />
                            {values.usernameErr && <p>{values.usernameErr}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                reqired
                                minLength="8"
                                placeholder="Enter password"
                            />
                            {values.passwordErr && <p>{values.passwordErr}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                reqired
                                placeholder="Enter email "
                            />
                            {values.emailErr && <p>{values.emailErr}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="birthday"
                                value={birthday}
                                onChange={e => setBirthday(e.target.value)}
                                reqired
                                placeholder="Enter birthday "
                            />
                            {values.birthdayErr && <p>{values.birthdayErr}</p>}
                        </Form.Group>
                        <Button variant="danger" text="light" type='submit' onClick={handleSubmit}>Register</Button>
                        <p>
                            Have an account already? Please &nbsp;
                            <Link to="/" className="text-danger">Login</Link>
                        </p>
                    </Col>
                </Form>
            </Stack>
        </div >

    );
}

RegistrationView.prototype = {
    name: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequire,
        birthday: PropTypes.string
    }).isRequired
};