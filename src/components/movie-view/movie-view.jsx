import './movie-view.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

   render() {
      const { movie, onBackClick } = this.props; //mapped object used as props from mainview components
      return (
         <div className="movie_view text-light">
            <Row className="justify-content-md-center">
               <img src={movie.imagepath} className="movieview-image" />
            </Row>
            <Row className="movieview-detail">
               <Col>Title:</Col>
               <Col xs={12} md={8}>{movie.title}</Col>
            </Row>

            <Row className="movieview-detail">
               <Col>DESCRIPTION: </Col>
               <Col xs={12} md={8}>{movie.description}</Col>
            </Row>
            <Row className="movieview-detail">
               <Link to={`/director/${movie.director.name}`}>
                  <Button variant="link">Director</Button>
               </Link>
            </Row>
            <Row className="movieview-detail">
               <Link to={`/genre/${movie.genre.name}`}>
                  <Button variant="link">Genre</Button>
               </Link>
            </Row>
            <Row className="movieview-detail">
               <Col>ACTOR:</Col>
               <Col xs={12} md={8}>{movie.actors}</Col>
            </Row>
            <Row className="movieview-detail">
               <Col>RELEASED YEAR:</Col>
               <Col xs={12} md={8}>{movie.releasedyear}</Col>
            </Row>
            <Button xs={12} md={8} size="md" variant="light" onClick={() => { onBackClick(); }}> Back </Button>
         </div >
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
         birth: PropTypes.string
      }),
      actors: PropTypes.array,
      releasedyear: PropTypes.string
   }).isRequired,
   onBackClick: PropTypes.func.isRequired
};





