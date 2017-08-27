import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Votes } from './../api/votes';
import { Options } from './../api/options';
import { Comments } from './../api/comments';
import VotingOptionsList from './VotingOptionsList';

export default class Voting extends React.Component {
    state = {
        selectedOptionId: null,
        votingComment: "",
        votedOptionId: false,
        voteCounts: {}
    };

    componentDidMount() {
        const { topicId } = this.props;

        const voted = Votes.findOne({
            votedBy: Meteor.userId(),
            topicId
        });

        let voteCounts = {};
        const options = Options.find({ forTopic: topicId }).fetch();

        options.forEach((option) => {
            const count = Votes.find({
                voteForOption: option._id
            }).count();

            voteCounts[option._id] = count;
        });


        this.setState({
            votedOptionId: voted ? voted.voteForOption : null,
            voteCounts
        });
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
                    voteCounts={this.state.voteCounts}
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

            Votes.insert({
                votedBy: Meteor.userId(),
                voteForOption: selectedOptionId,
                topicId: this.props.topicId
            }, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }

                Comments.insert({
                    commentedBy: Meteor.userId(),
                    content: votingComment,
                    forOption: selectedOptionId
                }, () => {
                    this.setState({
                        votedOptionId: selectedOptionId
                    });

                    const voteCounts = Object.assign({}, this.state.voteCounts, {
                        [selectedOptionId]: this.state.voteCounts[selectedOptionId] + 1
                    });
        
                    this.setState({
                        voteCounts
                    });
                });
            });
        } else {
            console.log('User not log inm');
        }
    }
}
