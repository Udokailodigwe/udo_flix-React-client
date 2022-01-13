import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Container } from 'react-bootstrap';

export class GenreView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container >
                <Row>
                    <Col className="label">Genre name: </Col>
                    <Col className="value">{movie.genre.name} </Col>
                </Row>
                <Row>
                    <Col className="label">Genre Description: </Col>
                    <Col className="value">{movie.genre.description} </Col>
                </Row>
                <br />
                <Button className="text-center" size="sm" variant="dark" type='submit' onClick={() => { onBackClick(null); }}>Back</Button>
            </Container >
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};