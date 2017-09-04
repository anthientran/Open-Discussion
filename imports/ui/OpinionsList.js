import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Opinions } from './../api/opinions';
import OpinionItem from './OpinionItem';

export default class OpinionsList extends React.Component {
    state = {
        opinions: []
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.optionId) {
            this.stopTracker();

            this.tracker = Tracker.autorun(() => {
                const opinions = Opinions.find({
                    optionId: nextProps.optionId
                }).fetch();
        
                this.setState({ opinions });
            });
        }
    }

    componentWillUnmount() {
        this.stopTracker();
    }

    handleLike = (optionId, isLike) => {
        if (isLike) {
            Opinions.update({_id: optionId}, {
                $push: { likedBy: Meteor.userId() }
            });
        } else { // Unlike
            Opinions.update({_id: optionId}, {
                $pull: { likedBy: Meteor.userId() }
            });
        }
    }

    render() {
        return (
            <div className="ui cards">
                {this.state.opinions.map((opinion) => {
                    return <OpinionItem
                                key={opinion._id}
                                commentId={opinion._id}
                                opinion={opinion}
                                onLike={this.handleLike}
                            />;
                })}
            </div>
        );
    }

    stopTracker() {
        if (this.tracker) {
            this.tracker.stop();
        }
    }
}
