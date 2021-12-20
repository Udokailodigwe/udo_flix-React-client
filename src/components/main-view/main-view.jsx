import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import axios from 'axios';

export class MainView extends React.Component{
   constructor(){ //initializing the .state values
      super(); //calling the constructor of this class component
      this.state = { //temporarily holds moviedata that will  be reused
         movies: [ ],
         selectedMovie: null //notifies the app that no moviecard was clicked
   };
}

componentDidMount(){
   axios.get('https://udo-flix.herokuapp.com/movies')
      .then(response => {
         this.setState({
            movies: response.data
         });
      })
      .catch(error => {
         console.log(error);
      });
}


   setSelctedMovie(newSelectedMovie){
      this.setState({selectedMovie:newSelectedMovie
      });
   }

   render() {
      const {movies, selectedMovie} = this.state;
            
      if (movies.length === 0)
         return <div className="main-view">The list is empty!</div>;

      if (selectedMovie) 
         return <MovieView movieData = {selectedMovie} onBackClick = {newSelectedMovie => {this.setSelctedMovie(newSelectedMovie);}} />; //take action when a movie is selected from mainview movie state and when backbutton is selected on movieview state

         return (
            <div className="main-view"> 
               {movies.map(movie => //mapped the movie object to reuse the result of the looped object as a props i.e. movieData
               <MovieCard key={movie._id} movieData = {movie} 
               onMovieClick = {(movieData) =>{ this.setSelctedMovie(movieData) }} //created function as  props to moviecard file component
               /> 
                  )} 
         </div>
      );
   }
}