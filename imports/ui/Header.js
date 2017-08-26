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
            <div className="ui menu">
                <div className="header item">
                    <Link to="/"><h1>Halden open discussion</h1></Link>
                </div>

                <div className="right menu">
                    <div className="item">
                        {this.renderLoginOrLogout()}
                    </div>
                </div>
            </div>
        );
    }

    renderLoginOrLogout() {
        if (!this.state.isAuthenticated) {
            return <Link to="login">Log in</Link>;
        } else {
            return <button className="ui button" onClick={this.onLogout.bind(this)}>Log out</button>;
        }
    }

    onLogout() {
        Accounts.logout();
        this.setState({
            isAuthenticated: false
        });
    }
}
