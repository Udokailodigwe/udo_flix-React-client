import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from 'react-bootstrap';

export function DirectorView(movie, onBackClick) {
    return (
        <Container>
            <Row>
                <Col className="label">Director name: </Col>
                <Col className="value">{movie.director[0].name} </Col>
            </Row>
            <Row>
                <Col className="label">Bio: </Col>
                <Col className="value">{movie.director[0].bio} </Col>
            </Row>
            <Row>
                <Col className="label">Birth year: </Col>
                <Col className="value">{movie.director[0].birth} </Col>
            </Row>
            <Row>
                <Col className="label">Death year: </Col>
                <Col className="value">{movie.director[0].death} </Col>
            </Row>
            <br />
            <Button className="text-center" size="sm" variant="dark" type='submit' onClick={() => { onBackClick(null); }}>Back</Button>
        </Container >
    );
}


DirectorView.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes,
        birth: PropTypes,
        death: PropTypes
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}