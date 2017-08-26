import React from 'react';
import { Options } from './../api/options'; 

export default class Voting extends React.Component {
    state = {
        options: []
    };

    componentDidMount() {
        const {topicId} = this.props;

        this.setState({
            options:  Options.find({forTopic: topicId}).fetch()
        });
    }

    render() {
        return (
            <div>
                <h1>Voting</h1>

                {this.state.options.map((option) => {
                    return (
                        <div key={option._id}>
                            <h3>{option.title}</h3>
                            <p>{option.description}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}
