import React from 'react';

export class UserInfo extends React.Component {
    render() {
        const { email, name, username, birthday, favoriteMovies } = this.props;

        return (
            <div>
                <p className="mb-4">Username: {name}</p>
                <p className="mb-4">e-mail: {email}</p>
                <p className="mb-4">Birthday: {birthday}</p>
            </div>
        );
    }
}