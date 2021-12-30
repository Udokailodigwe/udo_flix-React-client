import './movie-view.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Button } from 'react-bootstrap';

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
         <Container>
            <Card text="light" bg="dark" className="card-movieview">
               <img variant="top" src={movieData.imagepath} />
               <Card.Title>
                  TITLE: {movieData.title}
               </Card.Title>
               <Card.Text>
                  DESCRIPTION: {movieData.description}
               </Card.Text>
               <Card.Text>
                  ACTOR: {movieData.actors}
               </Card.Text>
               <Card.Text>
                  RELEASED YEAR: {movieData.releasedyear}
               </Card.Text>
            </Card>
            <Button size="md" variant="danger" onClick={() => { onBackClick(null); }}> Back </Button>

         </Container >
      );
   }
}

MovieView.propTypes = {
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
         birth: PropTypes.string
      }),
      actors: PropTypes.array,
      releasedyear: PropTypes.string
   }).isRequired,
   onBackClick: PropTypes.func.isRequired
};





