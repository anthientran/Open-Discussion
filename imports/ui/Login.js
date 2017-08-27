import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
    state = {
        fields: {
            email: '',
            password: '',
        },
        error: ''
    };

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <form
                        onSubmit={this.onSubmit.bind(this)}
                        className="ui large form"
                    >
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input
                                        type="email"
                                        name="email"
                                        value={this.state.fields.email}
                                        onChange={this.onInputChange.bind(this)}
                                        placeholder="Email"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>

                                    <input
                                        type="password"
                                        name="password"
                                        value={this.state.fields.password}
                                        onChange={this.onInputChange.bind(this)}
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            <button className="ui fluid large teal submit button">Log in</button>
                        </div>
                    </form>

                    <div className="ui message">
                        Don't have an account? <Link to="signup">Sign up here</Link>
                    </div>
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

        Meteor.loginWithPassword({ email: this.state.fields.email },
            this.state.fields.password,
            (err) => {
                console.log(err);
                let errorMessage = '';

                if (err) {
                    errorMessage + 'Unable to log in. Check email and password';
                }

                this.setState({
                    error: errorMessage
                });
            }
        )
    }
}
