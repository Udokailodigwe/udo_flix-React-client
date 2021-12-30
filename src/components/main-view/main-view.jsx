import React from 'react';
import axios from 'axios';

import './main-view.scss';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Navbar, Nav, Container, Row, Col, Badge, Form, FormControl } from 'react-bootstrap';


export class MainView extends React.Component {
   constructor() { //initializing the .state values
      super(); //calling the constructor of this class component
      this.state = { //temporarily holds moviedata that will  be reused
         movies: [],
         selectedMovie: null, //notifies the app that no moviecard was clicked
         user: null
      };
   }

   componentDidMount() {
      axios.get('https://udo-flix.herokuapp.com/movies')
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



   setSelctedMovie(newSelectedMovie) {
      this.setState({
         selectedMovie: newSelectedMovie
      });
   }

   //updates the user state property once a successfull login happens
   onLoggedIn(user) {
      this.setState({
         user
      });
   }


   render() {
      const { movies, selectedMovie, user } = this.state;

      //loginview rendered when no user is loggedin, else user details are passed as prop to loginview
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

      //before movies have been loaded
      if (movies.length === 0)
         return <div className="main-view" />;

      return (
         <div className="main-view">
            <Navbar expand="lg" fixed="top" bg="dark" className="navbar-mainview">
               <Container>
                  <Navbar.Brand href="#home"><Badge bg="light" text="danger">UDO_FLIX</Badge></Navbar.Brand>
                  <Form className="search">
                     <FormControl
                        type="search"
                        placeholder="Search"
                        className="search-formcontrol"
                        aria-label="Search"
                     />
                  </Form>
                  <Nav className="navlink-mainview">
                     <Nav.Link href="#Favourite"><Badge pill bg="danger" text="light">Favourites</Badge></Nav.Link>
                     <Nav.Link href="#Profile"><Badge pill bg="danger" text="light">Profile</Badge></Nav.Link>
                     <Nav.Link href="#LogIn"><Badge pill bg="danger" text="light">Log Out</Badge></Nav.Link>
                  </Nav>
               </Container>
            </Navbar>
            <br />
            <br />
            <Row className="main-view justify-content-md-center">
               {selectedMovie //if selectedmovie state is null all movies will be shown, else, the selected movie will be shown.
                  ? (
                     //take action when a movie is selected from mainview movie state and when backbutton is selected on movieview state
                     <Col md={8}>
                        <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelctedMovie(newSelectedMovie); }} />
                     </Col>
                  )
                  : movies.map(movie => (//mapped the movie object to reuse the result of the looped object as a props i.e. movieData
                     <Col md={3}>
                        <MovieCard key={movie._id} movieData={movie}
                           onMovieClick={newSelectedMovie => { this.setSelctedMovie(newSelectedMovie); }} //created function as  props to moviecard file component
                        />
                     </Col>
                  ))
               }
            </Row>
         </div>
      );
   }
}