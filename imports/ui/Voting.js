import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Options } from './../api/options';
import { Comments } from './../api/comments';
import VotingOptionsList from './VotingOptionsList';

export default class Voting extends React.Component {
    state = {
        selectedOptionId: null,
        votingComment: "",
        votedOptionId: null
    };

    componentDidMount() {
        const { topicId } = this.props;


    }

    render() {
        const { selectedOptionId, votingComment, votedOptionId } = this.state;

        return (
            <div>
                <h1>Voting</h1>

                <VotingOptionsList
                    topicId={this.props.topicId}
                    userId={Meteor.userId()}
                    selectedOptionId={selectedOptionId}
                    onOptionChanged={this.handleOptionChanged.bind(this)}
                    votingComment={votingComment}
                    onCommentChange={this.handleCommentChange.bind(this)}
                    votedOptionId={votedOptionId}
                />

                {this.renderVoteButtonIfHasNotVoted()}
            </div>
        );
    }

    renderVoteButtonIfHasNotVoted() {
        if (this.state.votedOptionId) {
            return <h3>You have voted</h3>
        }

        return (
            <button
                className="ui teal button"
                disabled={!this.state.selectedOptionId}
                onClick={this.handleVote.bind(this)}
            >
                Vote
            </button>
        );

    }

    handleOptionChanged(id) {
        this.setState({
            selectedOptionId: id
        });
    }

    handleCommentChange(evt) {
        evt.preventDefault();

        this.setState({
            votingComment: evt.target.value
        });
    }

    handleVote() {
        if (Meteor.userId()) {
            const { selectedOptionId, votingComment } = this.state;

            Options.update({_id: selectedOptionId}, {
                $push: { votedBy: Meteor.userId() }
            });

            Comments.insert({
                userId: Meteor.userId(),
                optionId: selectedOptionId,
                content: votingComment
            }, () => {
                this.setState({
                    votedOptionId: selectedOptionId
                });
            });
        } else {
            console.log('User not log inm');
        }
    }
}
