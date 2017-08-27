import React from 'react';
import { Options } from './../api/options';
import VotingOptionItem from './VotingOptionItem';

export default class VotingOptionsList extends React.Component {
    state = {
        options: []
    };

    componentDidMount() {
        const { topicId, userId } = this.props;

        this.setState({
            options: Options.find({ forTopic: topicId }).fetch(),
        });
    }

    render() {
        return (
            <div>
                <label>Which solution do you support?</label>
                <div className="ui list">
                    {this.state.options.map((option) => {
                        return (
                            <VotingOptionItem
                                key={option._id}
                                {...option}
                                voteCount={30}
                                selectedOptionId={this.props.selectedOptionId}
                                onOptionChanged={this.props.onOptionChanged}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
