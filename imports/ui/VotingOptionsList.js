import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Options } from './../api/options';
import VotingOptionItem from './VotingOptionItem';

export default class VotingOptionsList extends React.Component {
    state = {
        options: [],
    };

    componentDidMount() {
        const { topicId, userId } = this.props;

        this.optionsTracker = Tracker.autorun(() => {
            const options = Options.find({ forTopic: topicId }).fetch();

            this.setState({
                options
            });
        });
    }

    componentWillUnmount() {
        this.optionsTracker.stop();
    }

    render() {
        const { selectedOptionId, votingComment, votedOptionId, onOptionChanged, onCommentChange } = this.props;

        return (
            <div>
                <label>Which solution do you support?</label>
                <div className="ui list">
                    {this.state.options.map((option) => {
                        
                        return (
                            <VotingOptionItem
                                key={option._id}
                                {...option}
                                selectedOptionId={selectedOptionId}
                                onOptionChanged={onOptionChanged}
                                onCommentChange={onCommentChange}
                                votingComment={votingComment}
                                votedOptionId={votedOptionId}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
