import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
   render() {
      const { movieData, onMovieClick } = this.props; //mapped object used as props from mainview components
      return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>
         {movieData.title}
      </div>;
   }
}

MovieCard.propTypes = {
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
   onMovieClick: PropTypes.func.isRequired
};
