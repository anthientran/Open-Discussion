import React from 'react';
import { Modal, Header } from 'semantic-ui-react'
import { Tracker } from 'meteor/tracker';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classNames from 'classnames';
import moment from 'moment';

import { Comments } from './../api/comments';
import CommentsList from './CommentsList';

export default class OpinionItem extends React.Component {
    state = {
        isModalOpen: false,
        commentId: null,
        commentsNum: 0
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

    componentDidMount() {
        this.commentsNumTracker = Tracker.autorun(() => {
            const commentsNum = this.props.opinion.comments().fetch().length;
            this.setState({
                commentsNum
            });
        });
    }

    componentWillUnmount() {
        if (this.commentsNumTracker) {
            this.commentsNumTracker.stop();
        }
    }

    render() {
        const { opinion } = this.props;

        const user = opinion.user();

        const fullName = user.profile.firstName; // + ' ' + user.profile.lastName;

        const hasLiked = opinion.likedBy.indexOf(Meteor.userId()) !== -1;

        const commentsNum = opinion.comments().fetch().length;

        return (
            <div className="card">
                <div className="content">
                    <div className="right floated meta">{moment(opinion.time).fromNow()}</div>
                    <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/matt.jpg" /> {fullName}

                    <div className="description item--description">
                        <p>{opinion.text}</p>
                    </div>
                </div>

                <div
                    className="content"
                >
                    <span className="right floated">
                        <i
                            className={classNames("heart like icon", { "outline": !hasLiked })}
                            onClick={() => this.props.onLike(opinion._id, !hasLiked)}>
                        </i>
                        {opinion.likedBy.length} likes
                    </span>

                    <span
                        className="card--link"
                        onClick={() => this.openModal(this.props.commentId)}
                    >
                        <i className="comment icon"></i>
                        {this.state.commentsNum} comments
                    </span>
                </div>

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
                                opinionId={this.props.opinion._id}
                            />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}
