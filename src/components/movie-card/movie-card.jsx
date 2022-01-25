import './movie-card.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export class MovieCard extends React.Component {
   render() {
      const { movie } = this.props; //mapped object used as props from mainview components

      return (
         <Row xs={12} md={1} className="mt=3">
            <Col>
               <Card className=" card mb-3" >
                  <Card.Img src={movie.imagepath} className="card-image" />
                  <Card.ImgOverlay >
                     {/* <Card.Title className="card-title">{movie.title}</Card.Title> */}
                     <Link to={`/movies/${movie._id}`}>
                        <button className="card-button">Watch Movie</button>
                     </Link>
                  </Card.ImgOverlay>
               </Card>
            </Col>
         </Row>

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
