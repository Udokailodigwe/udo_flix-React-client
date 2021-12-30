import './movie-card.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Container } from 'react-bootstrap';

export class MovieCard extends React.Component {
   render() {
      const { movieData, onMovieClick } = this.props; //mapped object used as props from mainview components

      return (
         <Container>
            <Card bg="dark" text="light" className="card-moviecard">
               <Card.Img variant="top" src={movieData.imagepath} />
               <Card.Body>
                  <Card.Title>{movieData.title}</Card.Title>
                  <Card.Text>{movieData.description}</Card.Text>
                  <Button size="sm" onClick={() => onMovieClick(movieData)} variant="danger">Watch Movie</Button>
               </Card.Body>
            </Card>
         </Container>

      );
   }
}

MovieCard.propTypes = {
   movieData: PropTypes.shape({
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
         birth: PropTypes.string.isRequired
      }),
      actors: PropTypes.array,
      releasedyear: PropTypes.string.isRequired
   }).isRequired,
   onMovieClick: PropTypes.func.isRequired
};
