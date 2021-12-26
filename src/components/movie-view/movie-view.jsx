import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

   //creating keypress component for callbacks to add and removing events
   // keypressCallback(event) {
   //    console.log(event.key);
   // }

   // componentDidMount() {
   //    document.addEventListener('keypress', this.keypressCallback);
   // }

   // componentWillUnmount() {
   //    document.removeEventListener('keypress', this.keypressCallback);
   // }

   render() {
      const { movieData, onBackClick } = this.props; //mapped object used as props from mainview components
      return (
         <div className="movie-view">
            <div className="movie-poster">
               <img src={movieData.imagepath} />
            </div>
            <div className="movie-title">
               <span className="lable"> Title: </span>
               <span className="value">{movieData.title}</span>
            </div>
            <div className="movie-description">
               <span className="label">Description: </span>
               <span className="value">{movieData.description}</span>
            </div>
            <div className="movie-director">
               <span className="label">Actor: </span>
               <span className="value">{movieData.actors}</span>
            </div>
            <div className="movie-director">
               <span className="label">Released Year: </span>
               <span className="value">{movieData.releasedyear}</span>
            </div>
            <button onClick={() => { onBackClick(null); }}> Back </button>
         </div>
      );
   }
}

MovieView.propTypes = {
   movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imagepath: PropTypes.string.isRequired,
      genre: PropTypes.shape({
         name: PropTypes.string.isRequired,
         description: PropTypes.string.isRequired
      }),
      director: PropTypes.shape({
         name: PropTypes.string.isRequired,
         bio: PropTypes.string.isRequired,
         birth: PropTypes.date
      }),
      actors: PropTypes.array,
      releasedyear: PropTypes.date,
   }).isRequired,
   onBackClick: PropTypes.func.isRequired
};





