import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Switch, Redirect } from 'react-router-dom';

import './main-view.scss';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { Row, Col } from 'react-bootstrap';
import { NavbarView } from '../navbar-view/navbar-view';
import { ProfileView } from '../profile-view/profile-view';


export class MainView extends React.Component {
   constructor() { //initializing the .state values
      super(); //calling the constructor of this class component
      this.state = { //temporarily holds moviedata that will  be reused
         movies: [],
         user: null
      };
   }

   getMovies(token) {
      axios.get('https://udo-flix.herokuapp.com/movies', {
         headers: { Authorization: `Bearer ${token}` } //make auhthentication request
      })
         .then(response => {
            // Assign the result to the state
            this.setState({
               movies: response.data
            });
         })
         .catch(function (error) {
            console.log(error);
         });
   }

   componentDidMount() {
      //persist authentication from localStorage during reloads
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
         this.setState({
            user: localStorage.getItem('user')
         });
         this.getMovies(accessToken);
      }
   }


   //updates the user state property once a successfull login happens
   onLoggedIn(authData) {
      console.log(authData);
      this.setState({
         user: authData.users.username
      });// save authentication data in browser to avoid relogin
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.users.username);
      this.getMovies(authData.token);

   }

   onLoggedOut() {
      //delete authdata from localStorage to logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
         user: null
      });
   }

   render() {
      const { user, movies } = this.state;

      return (
         <Router>
            <NavbarView user={user} />
            <br />
            <br />
            <br />
            <br />
            <Row className="main-view justify-content-md-center">

               {/*main movie view*/}
               <Route exact path="/" render={() => {
                  //loginview rendered when no user is loggedin, else user detail is used as prop to loginview
                  if (!user) return <Col>
                     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  </Col>
                  //render empty page if no movie is loaded
                  if (movies.length === 0) return <div className="main-view" />;
                  return (movies.map(m => (
                     <Col md={3} key={m._id}>
                        <MovieCard movie={m} />
                     </Col>
                  )))
               }} />
               {/*registration view*/}
               <Route path="/register" render={({ match, history }) => {
                  if (user) return <Redirect to="/" />
                  return <Col lg={8} md={8}>
                     <RegistrationView />
                  </Col>
               }} />
               {/*single movie view*/}
               <Route path="/movies/:id" render={({ match, history }) => {
                  if (!user) return <Col>
                     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                     <MovieView movie={movies.find(m => m._id === match.params.id)}
                        onBackClick={() => history.goBack()} />
                  </Col>
               }} />

               {/*director view*/}
               <Route path="/director/:name" render={({ match, history }) => {
                  if (!user) return <Col>
                     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                     <DirectorView director={movies.find((m) => m.director.name === match.params.name).director
                     }
                        onBackClick={() => history.goBack()} />
                  </Col>
               }} />
               {/*genre view*/}
               <Route path="/genre/:name" render={({ match, history }) => {
                  if (!user) return <Col>
                     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                     <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre}
                        onBackClick={() => history.goBack()} />
                  </Col>
               }} />
               {/*profile view*/}
               <Route path={`/users/:username`} render={({ match, history }) => {
                  if (!user) return <Col>
                     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                     <ProfileView movies={movies} user={user === match.params.username}
                        history={history}
                        onBackClick={() => history.goBack()} removeFavorite={(_id) => this.removeFavorite(_id)} />
                  </Col>
               }} />
            </Row>
         </Router>
      );
   }
}