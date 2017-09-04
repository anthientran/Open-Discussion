import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Options } from './../api/options';
import { Opinions } from './../api/opinions';
import VotingOptionsList from './VotingOptionsList';
import Chart from './Chart';

export default class Voting extends React.Component {
    state = {
        selectedOptionId: null,
        votingComment: "",
        votedOptionId: null,
        chartData: {
            labels: [],
            datasets: [
                {
                    label: 'Voting results',
                    data: [],
                    backgroundColor: [ // temporarily harcoded
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                    ]
                }
            ]
        }
    };

    componentDidMount() {
        const { topicId } = this.props;

        this.tracker = Tracker.autorun(() => {
            const chartData = Object.assign({}, this.state.chartData);
            chartData.labels = [];
            chartData.datasets[0].data = [];
    
            const options = Options.find({ forTopic: topicId }).fetch();
    
            const op = Opinions.findOne({
                userId: Meteor.userId(),
                optionId: {
                    $in: options.map(option => option._id)
                }
            });
    
            options.forEach((option) => {
                chartData.datasets[0].data.push(option.votedBy.length);
                chartData.labels.push(option.title);
            });
    
            if (op) {
                this.setState({
                    votedOptionId: op.optionId
                });
            }
    
            this.setState({
                chartData
            });
        });
        
    }

    componentWillUnmount() {
        if (this.tracker) {
            this.tracker.stop();
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

                <Chart data={this.state.chartData} />
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
