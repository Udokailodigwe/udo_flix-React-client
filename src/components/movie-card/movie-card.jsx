import './movie-card.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export class MovieCard extends React.Component {
   render() {
      const { movie } = this.props; //mapped object used as props from mainview components

      return (
         <Container>
            <Card bg="dark" text="light" className="card-moviecard">
               <Card.Img variant="top" src={movie.imagepath} />
               <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Link to={`/movies/${movie._id}`}>
                     <Button size="sm" variant="link">Watch Movie</Button>
                  </Link>
               </Card.Body>
            </Card>
         </Container>

      );
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
         birth: PropTypes.string.isRequired
      }),
      actors: PropTypes.array,
      releasedyear: PropTypes.string.isRequired
   }).isRequired,
};
