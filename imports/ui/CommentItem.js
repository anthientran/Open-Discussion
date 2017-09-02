import React from 'react';
import PropTypes from 'prop-types';

export default class CommentItem extends React.Component {
    render() {
        const { text, userName } = this.props;

        return (
            <div className="comment">
                <a className="avatar">
                    <img src="https://semantic-ui.com/images/avatar/small/matt.jpg" />
                </a>
                <div className="content">
                    <a className="author">{userName}</a>
                    <div className="metadata">
                        <span className="date">Today at 5:42PM</span>
                    </div>
                    <div className="text">
                        {text}
                    </div>
                    <div className="actions">
                        <a className="reply">Reply</a>
                    </div>
                </div>
            </div>
        );
    }
}
