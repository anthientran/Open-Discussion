import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Comments } from './../api/comments';
import CommentItem from './CommentItem';

export default class AddComment extends React.Component {
    state = {
        replyText: "",

    };

    handleTextChange = (evt) => {
        this.setState({
            replyText: evt.target.value
        });
    }

    render() {
        return (
            <form className="ui reply form">
                <div className="field">
                    <textarea
                        value={this.state.replyText}
                        onChange={this.handleTextChange}>

                    </textarea>
                </div>
                <div
                    className="ui blue labeled submit icon button"
                    onClick={() => this.props.onAddReplyClicked(this.state.replyText)}
                >
                    <i className="icon edit"></i> Add Reply
                </div>
            </form>
        );
    }
}
