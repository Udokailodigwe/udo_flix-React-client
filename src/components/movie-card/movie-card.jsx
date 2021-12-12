import React from 'react';

export class MovieCard extends React.Component{
   render(){
      const {movieData, onMovieClick} = this.props; //mapped object used as props from mainview components
         return <div className="movie-card" onClick={()=>{onMovieClick(movieData);}}>
                     {movieData.Title}
                  </div>;
   }
}