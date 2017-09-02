import React from 'react';
import { Modal, Header } from 'semantic-ui-react'
import { Tracker } from 'meteor/tracker';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { Comments } from './../api/comments';
import CommentsList from './CommentsList';

export default class OpinionItem extends React.Component {
    state = {
        isModalOpen: false,
        commentId: null,
        comments: [],
        replyText: ""
    }

    renderCommentCard = () => {
        return (
            <div className="ui card">
                <div className="content">
                    <div className="right floated meta">14h</div>
                    <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/matt.jpg" /> {this.props.fullName}

                    <div className="description item--description">
                        <p>{this.props.text}</p>
                    </div>
                </div>

                <div
                    className="content"
                >
                    <span className="right floated">
                        <i className="heart outline like icon"></i>
                        17 likes
                    </span>

                    <span onClick={() => this.openModal(this.props.commentId)}>
                        <i className="comment icon"></i>
                        3 comments
                    </span>
                </div>
            </div>
        );
    }

    runRepliesTracker = () => {
        
    }

    stopRepliesTracker = () => {
        if (this.repliesTracker) {
            this.repliesTracker.stop();
        }
    }

    handleModalMount = () => {
        this.runRepliesTracker();
    }

    handleModalUnmount = () => {
        this.stopRepliesTracker();
    }

    handleModalClose = () => {
        this.setState({
            isModalOpen: false,
            commentId: null,
            commentReplies: []
        });
    }

    openModal = (commentId) => {
        this.setState({
            isModalOpen: true,
            commentId
        });
    }

    handleAddReply = () => {
        Comments.insert({
            opinionId: this.props.opinionId,
            userId: Meteor.userId()
        });
    }

    render() {
        return (
            <div>
                {this.renderCommentCard()}
                <Modal
                    open={this.state.isModalOpen}
                    onMount={this.handleModalMount}
                    onUnmount={this.handleModalUnmount}
                    onClose={this.handleModalClose}
                >
                    <Modal.Header>Comments</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <CommentsList
                                opinionId={this.props.opinionId}
                            />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}
