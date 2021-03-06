import './movie-view.scss';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
   constructor() {
      super();
      this.state = {
         isFavorite: 'Mark as Favorite' //initial favorite state status.
      };
   }

   //favorite movie function
   selectedFavorite() {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');

      //changed favorite state status on action.
      this.setState({
         isFavorite: 'Movie added as favorite!'
      });
      //post selected movie by user to server as favorite.
      axios.post(`https://udo-flix.herokuapp.com/users/${username}/movies/` + this.props.movie._id, [], {
         headers: { Authorization: `Bearer ${token}` }
      })
         .then((response) => {
            console.log(response);
         })
         .catch((error) => {
            console.log(error);
         });
   }




   render() {
      const { movie, onBackClick } = this.props; //mapped object used as props from mainview components
      return (
         <div className="movie_view text-light mt-5">
            <Row className="justify-content-md-center">
               <img src={movie.imagepath} className="movieview-image" />
            </Row>
            <Row className="movieview-detail">
               <Col>Title:</Col>
               <Col >{movie.title}&nbsp;
                  <Button variant="secondary" size="sm" onClick={() => this.selectedFavorite()}>
                     {this.state.isFavorite}
                  </Button>
               </Col>
            </Row>
            <Row className="movieview-detail">
               <Col>Description: </Col>
               <Col >{movie.description}</Col>
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
               <Col>Actor:</Col>
               <Col >{movie.actors}</Col>
            </Row>
            <Row className="movieview-detail">
               <Col>Released year:</Col>
               <Col >{movie.releasedyear}</Col>
            </Row>
            <Button  size="md" variant="dark" onClick={() => { onBackClick(); }}> Back </Button>
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





