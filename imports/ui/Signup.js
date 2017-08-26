import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
    state = {
        fields: {
            email: '',
            password: '',
            lastName: '',
            firstName: ''
        },
        error: ''
    };

    render() {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <form
                        onSubmit={this.onSubmit.bind(this)}
                        className="ui large form"
                    >
                        <div className="required field">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={this.state.fields.firstName}
                                onChange={this.onInputChange.bind(this)}
                                placeholder="First name"
                            />
                        </div>
                        <div className="required field">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={this.state.fields.lastName}
                                onChange={this.onInputChange.bind(this)}
                                placeholder="Last name"
                            />
                        </div>

                        <div className="required field">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={this.state.fields.email}
                                onChange={this.onInputChange.bind(this)}
                                placeholder="Email"
                            />
                        </div>

                        <div className="required field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.fields.password}
                                onChange={this.onInputChange.bind(this)}
                                placeholder="Password"
                            />
                        </div>

                        
                        <button
                            className="ui fluid large teal submit button"
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    onInputChange(evt) {
        evt.preventDefault();

        

        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value.trim();

        this.setState({
            fields
        });
    }

    onSubmit(evt) {
        evt.preventDefault();

        const {email, password, lastName, firstName} = this.state.fields;

        console.log(this.state);

        Accounts.createUser({
            email, 
            password,
            profile: {
                lastName,
                firstName
            }
        }, (err) => {
            console.log(err);
        });
    }
}
