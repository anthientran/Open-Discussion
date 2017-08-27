import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Votes } from './../api/votes';
import VotingOptionsList from './VotingOptionsList';

export default class Voting extends React.Component {
    state = {
        selectedOptionId: null,
        hasVoted: false,
        voteCounts: {}
    };

    componentDidMount() {
        const { topicId } = this.props;

        const hasVoted = Votes.find({
            votedBy: Meteor.userId(),
            topicId
        }).count() > 0;

        this.setState({
            hasVoted
        });
    }

    render() {
        return (
            <div>
                <h1>Voting</h1>

                <VotingOptionsList
                    topicId={this.props.topicId}
                    userId={Meteor.userId()}
                    selectedOptionId={this.state.selectedOptionId}
                    onOptionChanged={this.handleOptionChanged.bind(this)}
                />

                {this.renderVoteButtonIfHasNotVoted()}
            </div>
        );
    }

    renderVoteButtonIfHasNotVoted() {
        if (this.state.hasVoted) {
            return <h3>You have voted</h3>
        }

        return (
            <button
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

    handleVote() {
        if (Meteor.userId()) {
            Votes.insert({
                votedBy: Meteor.userId(),
                voteForOption: this.state.selectedOptionId,
                topicId: this.props.topicId
            }, (err, res) => {
                if (err) {
                    console.log(err);
                }

                this.setState({
                    hasVoted: true
                });
            });
        } else {
            console.log('User not log inm');
        }
    }

    /* fetchVotingResult() {
        const optionIds = this.state.options.map(option => option._id);

        let voteCounts = {};
        this.state.options.forEach(option => {
            const count = Votes.find({
                voteForOption: option._id
            }).count();

            voteCounts[option._id] = count;
        });

        this.setState({ voteCounts });
    } */
}
