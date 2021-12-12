import React from 'react';

export class MovieView extends React.Component {
   render() {
      const {movieData, onBackClick} = this.props; //mapped object used as props from mainview components
         return( 
         <div className="movie-view">
            <div className="movie-paster">
               <img src = {movieData.ImagePath} />
            </div>
            <div className="movie-title">
               <span className="lable"> Title: </span>
               <span className="value">{movieData.Title}</span>
            </div>
            <div className="movie-description">
               <span className="label">Description: </span>
               <span className="value">{movieData.Description}</span>
            </div>
            <div className="movie-director">
               <span className="label">Director: </span>
               <span className="value">{movieData.Director}</span>
            </div> 
            <button onClick={()=>{onBackClick(null);}}> Back </button> 
         </div> 
      );
   }
} 