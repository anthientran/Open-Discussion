import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Comments } from './../api/comments';
import CommentItem from './CommentItem';
import AddComment from './AddComment';

export default class CommentsList extends React.Component {
    state = {
        comments: []
    };

    render() {
        return (
            <div className="ui comments">
                {this.state.comments.map((comment) => {
                    const user = comment.user();

                    const fullName = user.profile.firstName.charAt(0) + '.' +  user.profile.lastName.charAt(0);

                    return <CommentItem
                        key={comment._id}
                        {...comment}
                        userName={fullName}
                    />
                })}
                
                <AddComment
                    onAddReplyClicked={this.handleAddReply}
                />
            </div>
        );
    }

    handleAddReply = (text) => {
        Comments.insert({
            opinionId: this.props.opinionId,
            text,
            userId: Meteor.userId(),
            replyTo: null,
            time: new Date().getTime()
        }, (err) => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            const comments = Comments.find({
                replyTo: null,
                opinionId: this.props.opinionId
            }).fetch();

            this.setState({
                comments
            });
        });
    }

    componentWillUnmount() {
        this.tracker.stop();
    }
}
