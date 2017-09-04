import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Options } from './../api/options';
import { Opinions } from './../api/opinions';
import VotingOptionsList from './VotingOptionsList';

export default class Voting extends React.Component {
    state = {
        selectedOptionId: null,
        votingComment: "",
        votedOptionId: null
    };

    componentDidMount() {
        const { topicId } = this.props;

        const options = Options.find({ forTopic: topicId }).fetch();

        const op = Opinions.findOne({
            userId: Meteor.userId(),
            optionId: {
                $in: options.map(option => option._id)
            }
        });

        if (op) {
            this.setState({
                votedOptionId: op.optionId
            });
        }
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

                <div className="space_top">
                    {this.renderVoteButtonIfHasNotVoted()}
                </div>

            </div>
        );
    }

    renderVoteButtonIfHasNotVoted() {
        if (this.state.votedOptionId) {
            return (
                <div className="ui success message">
                    <div className="header">You have voted</div>
                    <p>View your comment and join the discussion in the Discussion section</p>
                </div>
            );
        }

        if (Meteor.userId()) {
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
        return (
            <div className="ui success message">
                <div className="header">Please log in to vote</div>
            </div>
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

            Options.update({ _id: selectedOptionId }, {
                $push: { votedBy: Meteor.userId() }
            });

            Opinions.insert({
                userId: Meteor.userId(),
                optionId: selectedOptionId,
                text: votingComment,
                likedBy: [],
                time: new Date().getTime()
            }, (err) => {
                console.log(err);

                this.setState({
                    votedOptionId: selectedOptionId
                });
            });
        } else {
            console.log('User not log in');
        }
    }
}
