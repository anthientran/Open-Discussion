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
            if (this.commentsTracker) {
                this.commentsTracker.stop();
            }

            this.commentsTracker = Tracker.autorun(() => {
                const comments = Comments.find({
                    forOption: nextProps.optionId
                }).fetch();
        
                this.setState({comments});
            });
        }
    }

    componentWillUnmount() {
        this.commentsTracker.stop();
    }

    render() {
        return (
            <div className="ui cards">
                {this.state.comments.map((comment) => {
                    return <CommentItem
                                key={comment._id}
                                content={comment.content}
                            />
                })}
            </div>
        );
    }
}
