import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

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

      //if selectedmovie state is null all movies will be shown, else, the selected movie will be shown.      
      if (selectedMovie)
         return <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelctedMovie(newSelectedMovie); }} />; //take action when a movie is selected from mainview movie state and when backbutton is selected on movieview state

      return (
         <div className="main-view">
            {movies.map(movie => //mapped the movie object to reuse the result of the looped object as a props i.e. movieData
               <MovieCard key={movie._id} movieData={movie}
                  onMovieClick={(movieData) => { this.setSelctedMovie(movieData) }} //created function as  props to moviecard file component
               />
            )}
         </div>
      );
   }
}