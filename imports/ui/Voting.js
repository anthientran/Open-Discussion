import React from 'react';
import { Options } from './../api/options'; 
import VotingOptionItem  from './VotingOptionItem';

export default class Voting extends React.Component {
    state = {
        options: [],
        selectedOptionId: null
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
                        <VotingOptionItem 
                            key={option._id}
                            {...option}
                            selectedOptionId={this.state.selectedOptionId} 
                            onOptionChanged={this.handleOptionChanged.bind(this)}
                        />
                    );
                })}
            </div>
        );
    }

    handleOptionChanged(id) {
        this.setState({
            selectedOptionId: id
        });
    }
}
