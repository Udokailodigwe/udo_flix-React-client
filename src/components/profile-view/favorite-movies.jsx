import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class FavoriteMovies extends React.Component {
    render() {
        const { favoriteMovies, removeFavorite } = this.props;

        return (
            <div>
                <h2>Favorite Movies</h2>
                {favoriteMovies.map((movies) => {
                    return (
                        <div key={movies._id}>
                            <img src={movies.imagepath} />
                            <Link to={`/movies/${movies._id}`}>
                                <h4>{movies.title}</h4>
                            </Link>
                            <Button variant="danger" onClick={() => removeFavorite(movies._id)}>Remove movie</Button>
                        </div>
                    )
                })}
            </div>
        );
    }
}