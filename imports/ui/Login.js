import React from 'react';
import { Link } from 'react-router';

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
            <div className="ui three column centered grid">
                <div className="column">
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
    }
}
