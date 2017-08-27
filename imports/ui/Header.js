import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default class Header extends React.Component {
    state = {
        isAuthenticated: !!Meteor.userId()
    }

    render() {
        return (
            <div className="main-header">
                <div className="main-header__content">
                    <Link to="/" className="main-header--link"><h1>Halden open discussion</h1></Link>

                    {this.renderLoginOrLogout()}
                </div>
            </div>
        );
    }

    renderLoginOrLogout() {
        if (!this.state.isAuthenticated) {
            return <Link to="login" className="ui teal button">Log in</Link>;
        } else {
            return <button className="ui button teal" onClick={this.onLogout.bind(this)}>Log out</button>;
        }
    }

    onLogout() {
        Accounts.logout();
        this.setState({
            isAuthenticated: false
        });
    }
}
