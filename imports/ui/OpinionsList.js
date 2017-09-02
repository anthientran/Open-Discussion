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

    render() {
        return (
            <div className="ui cards">
                {this.state.opinions.map((opinion) => {
                    const user = opinion.user();

                    const fullName = user.profile.firstName + ' ' +  user.profile.lastName;
                    return <OpinionItem
                                key={opinion._id}
                                text={opinion.text}
                                commentId={opinion._id}
                                fullName={fullName}
                                opinionId={opinion._id}
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
