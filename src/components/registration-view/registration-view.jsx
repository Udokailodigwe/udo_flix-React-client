import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';


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
        <form>
            <label>
                Username:
                <input type="text" value={username} />
            </label>
            <label>
                Password:
                <input type="password" value={password} />
            </label>
            <label>
                Email:
                <input type="email" value={email} />
            </label>
            <label>
                Birthday:
                <input type="date" value={birthday} />
            </label>
            <button type='submit' onClick={handleSubmit}>Submit</button>
        </form>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.date
    })
};