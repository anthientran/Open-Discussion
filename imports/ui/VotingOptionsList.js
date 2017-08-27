import React from 'react';
import { Options } from './../api/options';
import { Votes } from './../api/votes';
import VotingOptionItem from './VotingOptionItem';

export default class VotingOptionsList extends React.Component {
    state = {
        options: [],
    };

    componentDidMount() {
        const { topicId, userId } = this.props;

        
        const options = Options.find({ forTopic: topicId }).fetch();


        this.setState({
            options
        });
    }

    render() {
        const { selectedOptionId, votingComment, votedOptionId, onOptionChanged, onCommentChange } = this.props;

        console.log(this.props.voteCounts);
        
        return (
            <div>
                <label>Which solution do you support?</label>
                <div className="ui list">
                    {this.state.options.map((option) => {
                        return (
                            <VotingOptionItem
                                key={option._id}
                                {...option}
                                voteCount={this.props.voteCounts[option._id]}
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
