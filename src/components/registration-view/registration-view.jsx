import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';


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
    });


    const validate = () => {
        let isReq = true;
        if (!name) {
            setValues({ ...values, nameErr: 'Name is requires' });
            isReq = false;
        } else if (name.length < 2) {
            setValues({ ...values, nameErr: 'Name should be more one character long' });
            isReq = false;
        }
        if (!username) {
            setValues({ ...values, usernameErr: 'Username is required' });
            isReq = false;
        } else if (username.length < 3) {
            setValues({ ...values, usernameErr: 'Username must be 3 characters long' });
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
                    const user = response.data;
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
        <Container>
            <CardGroup>
                <Card>
                    <Card.Body>
                        <Card.Title>Please register to access udo_flix</Card.Title>
                        <Form>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                reqired
                                placeholder="Enter Name"
                            />
                            {values.nameErr && <p>{values.nameErr}</p>}
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                reqired
                                placeholder="Enter a username"
                            />
                            {values.usernameErr && <p>{values.usernameErr}</p>}
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
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                reqired
                                placeholder="Enter email "
                            />
                            {values.emailErr && <p>{values.emailErr}</p>}
                            <Button variant="primary" type='submit' onClick={handleSubmit}>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </CardGroup>
        </Container >

    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string
    })
};