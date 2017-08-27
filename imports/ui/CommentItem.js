import React from 'react';
import PropTypes from 'prop-types';

export default class CommentItem extends React.Component {
    render() {
        return (
            <div className="ui card">
                <div className="content">
                    <div className="right floated meta">14h</div>
                    <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/matt.jpg" /> Elliot

                    <div className="description">
                        <p>{this.props.content}</p>
                    </div>
                </div>

                <div className="content">
                    <span className="right floated">
                        <i className="heart outline like icon"></i>
                        17 likes
                    </span>
                    <i className="comment icon"></i>
                        3 comments
                </div>
            </div>
        );
    }
}
