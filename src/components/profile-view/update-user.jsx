import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

export class UpdateUser extends React.Component {
    render() {
        const { user, handleSubmit, handleUpdate } = this.props;

        return (
            <Form onSubmit={(e) => this.handleUpdate(
                e,
                this.username,
                this.password,
                this.email,
            )}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            defaultValue={user.username}
                            onChange={e => handleUpdate(e)} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            defaultValue={user.password}
                            onChange={e => handleUpdate(e)} />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        defaultValue={user.email}
                        onChange={e => handleUpdate(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        defaultValue={user.birthday}
                        onChange={e => handleUpdate(e.target.value)} />
                </Form.Group>
                <br />
                <Button type="submit" size="sm" variant="light" onClick={() => { handleSubmit(); }}>Update Profile</Button>
            </Form >
        );
    }
} 