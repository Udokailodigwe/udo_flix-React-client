import React from 'react';
import axios from 'axios';
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';



export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: []
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getUser(accessToken);
        }
    }

    getUser = (token) => {
        const username = localStorage.getItem('user');
        axios.get(`https://udo-flix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    favoriteMovies: response.data.favoriteMovies,
                });
            })
            .catch((error) => {
                console.log(error);
            });

    };

    //remove favorite movie
    removeFavorite(movies) {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.delete(`https://udo-flix.herokuapp.com/users/${username}/movies/${movie._id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                alert('Movie was successfully removed');
                this.componentDidMount();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //enable users to edit and update profile
    handleUpdate = (e) => {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://udo-flix.herokuapp.com/users/${username}`, {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            birthday: this.state.birthday,

        },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((response) => {
                this.setState({
                    username: response.data.username,
                    password: response.data.username,
                    email: response.data.email,
                    birthday: response.data.birthday,
                });
                localStorage.setItem('user', this.state.username);
                const data = response.data;
                console.log(data);
                console.log(this.state.username);
                alert("Your profile is updated");
                window.open(`./user/${username}`, "_self");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //deregistering a user
    deleteUser() {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://udo-flix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response);
                alert("Your profile has been successfully deleted!");
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    handleSubmit(data) {
        console.log('submitted')
    }
    render() {

        const { username, password, email, birthday, favoriteMovies } = this.state;


        return (
            <Container>
                <Row>
                    <Col xs={12} sm={4} >
                        <Card bg="dark" text="light">
                            <Card.Header>Your Information</Card.Header>
                            <Card.Body>
                                <UserInfo name={username} email={email} birthday={birthday} favoriteMovies={favoriteMovies} password={password} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3" xs={12} sm={8}>
                        <Card bg="dark" text="light">
                            <Card.Header>Edit Your Information</Card.Header>

                            <Card.Body>
                                <UpdateUser user={this.state} handleSubmit={(user) => this.handleSubmit(user)} handleUpdate={(user) => this.handleUpdate(user)} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card bg="dark" text="light">
                            <FavoriteMovies favoriteMovies={favoriteMovies} removeFavorite={(item) => this.removeFavorite(item)} />
                        </Card>
                    </Col>
                </Row>
            </Container >
        );
    }





}