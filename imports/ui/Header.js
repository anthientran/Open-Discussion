import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Halden Open Discussion</h1>
                
                <Link to="login">Log in</Link>
            </div>
        );
    }
}
