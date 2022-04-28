import React from 'react';
import { Button } from 'react-bootstrap';
import './favorite-movies.scss';

export class FavoriteMovies extends React.Component {

    render() {
        const { favoriteMovies, removeFavorite, movies } = this.props;

        // filter users favorite movies from movies list passed as props
        const favMovies = movies.filter(mov => favoriteMovies.includes(mov._id));
        return (
            <div className='fav-container'>
                <h1>Your Favorite Movies</h1>
                <div className='main-div'>
                {favMovies.map((movies) => {
                    return (
                        <div key={movies._id}>
                                <div>
                                <img src={movies.imagepath} />
                                </div>
                            <Button
                                variant="danger"
                                value={movies._id}
                                onClick={() => removeFavorite(movies._id)}
                            >
                                Remove movie
                            </Button>
                        </div>
                    )
                })
                }
            </div >
        </div>
        );
    }
}