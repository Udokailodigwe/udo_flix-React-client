import React from 'react';
import axios from 'axios';
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setUser, updateUser } from '../../actions/actions';

import './profile-view.scss';



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
    removeFavorite(movie) {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.delete(`https://udo-flix.herokuapp.com/users/${username}/movies/${movie}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response)
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
    deleteUser(e) {
        e.preventDefault();
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

    //change the shown old value in the state to newly entered value 
    setUsername(value) {
        this.setState({ username: value })
    }
    setPassword(value) {
        this.setState({ password: value })
    }

    setEmail(value) {
        this.setState({ email: value })
    }
    setBirthday(value) {
        this.setState({ birthday: value })
    }

    render() {

        const { username, email, birthday, favoriteMovies } = this.state;
        const { movies } = this.props;
        return (
            <Container className="profile-container mt-5">
                <Row>
                    <Col xs={12} sm={6} >
                        <Card className = 'userinfo' bg="dark" text="light">
                            <Card.Header>Your Information</Card.Header>
                            <Card.Body>
                                <UserInfo
                                    name={username}
                                    email={email}
                                    birthday={birthday}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3" xs={12} sm={6} >
                        <Card bg="dark" text="light">
                            <Card.Header>Update Your Information</Card.Header>

                            <Card.Body>
                                <UpdateUser
                                    user={this.state}
                                    handleUpdate={(user) => this.handleUpdate(user)}
                                    setUsername={(value) => this.setUsername(value)}
                                    setPassword={(value) => this.setPassword(value)}
                                    setEmail={(value) => this.setEmail(value)}
                                    setBirthday={(value) => this.setBirthday(value)}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <FavoriteMovies
                                favoriteMovies={favoriteMovies}
                                removeFavorite={(item) => this.removeFavorite(item)}
                                selectedFavorite={(e) => this.selectedFavorite(e)}
                                movies={movies}
                            />
                <div className="text-center">
                    <p variant="light">Hit the button below to delete account.</p>
                    <Button variant="danger" onClick={(e) => this.deleteUser(e)}>
                        Delete Your Account Profile
                    </Button>
                    <p variant="light">Note! deletion cannot be reversed.</p>
                </div>
            </Container >
        );
    }
}


let mapStateToProps = state => {
    return {
        user: state.user,
        movies: state.movies
    }
}

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);