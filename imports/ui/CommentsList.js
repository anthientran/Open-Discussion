import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Comments } from './../api/comments';
import CommentItem from './CommentItem';

export default class CommentsList extends React.Component {
    state = {
        comments: []
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.optionId) {
            this.stopTracker();

            this.commentsTracker = Tracker.autorun(() => {
                const comments = Comments.find({
                    optionId: nextProps.optionId
                }).fetch();
        
                this.setState({comments});
            });
        }
    }

    componentWillUnmount() {
        this.stopTracker();
    }

    render() {
        return (
            <div className="ui cards">
                {this.state.comments.map((comment) => {
                    const user = comment.user();

                    const fullName = user.profile.firstName + ' ' +  user.profile.lastName;
                    return <CommentItem
                                key={comment._id}
                                content={comment.content}
                                fullName={fullName}
                            />
                })}
            </div>
        );
    }

    stopTracker() {
        if (this.commentsTracker) {
            this.commentsTracker.stop();
        }
    }
}
