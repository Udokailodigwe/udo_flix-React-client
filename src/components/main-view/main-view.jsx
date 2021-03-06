import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import './main-view.scss';

//import { MovieCard } from '../movie-card/movie-card'; //transferred to movielist component
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { Row, Col } from 'react-bootstrap';
import { NavbarView } from '../navbar-view/navbar-view';
import { ProfileView } from '../profile-view/profile-view';
import MoviesList from '../movies-list/movies-list';




class MainView extends React.Component {
   constructor() { //initializing the .state values
      super(); //calling the constructor of this class component
      this.state = { //temporarily holds moviedata that will  be reused
         user: null
      };
   }

   getMovies(token) {
      axios.get(`https://udo-flix.herokuapp.com/movies`, {
         headers: { Authorization: `Bearer ${token}` } //make auhthentication request
      })
         .then(response => {
            // Assign the result as props
            this.props.setMovies( //dispatch function mapped to props
               response.data
            );
            console.log(response.data)
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
      const { movies } = this.props;
      const { user } = this.state;

      return (
         <Router>
            <NavbarView user={user} />
            <Row className="main-view mt-5" >

               {/*main movie view*/}
               <Route exact path="/" render={() => {
                  //loginview rendered when no user is loggedin, else user detail is used as prop to loginview
                  if (!user) return <Col>
                     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  //render empty page if no movie is loaded
                  if (movies.length === 0) return <div className="main-view" />;
                  return < MoviesList movie={movies} />;
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
                  return <Col xs={12} >
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
                  return <Col xs={12}>
                     <DirectorView director={movies.find((m) => m.director.name === match.params.name).director}
                        onBackClick={() => history.goBack()} />
                  </Col>
               }} />
               
               {/*genre view*/}
               <Route path="/genre/:name" render={({ match, history }) => {
                  if (!user) return <Col>
                     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col xs={12}>
                     <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre}
                        onBackClick={() => history.goBack()} />
                  </Col>
               }} />

               {/*profile view*/}
               <Route path={`/users/:user`} render={({ match, history }) => {
                  if (!user) return <Col>
                     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col>
                     <ProfileView
                        movies={movies}
                        // movie={movies.find(m => m._id === match.params.movieId)}
                        user={user === match.params.user}
                        history={history}
                        removeFavorite={(_id) => this.removeFavorite(_id)}
                        selectedFavorite={(e) => this.selectedFavorite(e)} />
                  </Col>
               }} />
            </Row>
         </Router>
      );
   }
}

let mapStateToProps = state => { //map component state to props for store through connect()
   return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView); 