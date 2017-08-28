import React from 'react';
import { Modal, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types';

export default class CommentItem extends React.Component {
    state = {
        isModalOpen: true
    }

    renderCommentCard = () => {


        return (
            <div className="ui card link">
                <div className="content">
                    <div className="right floated meta">14h</div>
                    <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/matt.jpg" /> {this.props.fullName}

                <div className="description item--description">
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

    render() {
        return (
            <div>
                <Modal trigger={this.renderCommentCard()}>
                    <Modal.Header>Comments</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <div className="ui comments">
                                <div className="comment">
                                    <a className="avatar">
                                        <img src="https://semantic-ui.com/images/avatar/small/matt.jpg" />
                                    </a>
                                    <div className="content">
                                        <a className="author">Matt</a>
                                        <div className="metadata">
                                            <span className="date">Today at 5:42PM</span>
                                        </div>
                                        <div className="text">
                                            How artistic!
                                </div>
                                        <div className="actions">
                                            <a className="reply">Reply</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment">
                                    <a className="avatar">
                                        <img src="https://semantic-ui.com/images/avatar/small/elliot.jpg" />
                                    </a>
                                    <div className="content">
                                        <a className="author">Elliot Fu</a>
                                        <div className="metadata">
                                            <span className="date">Yesterday at 12:30AM</span>
                                        </div>
                                        <div className="text">
                                            <p>This has been very useful for my research. Thanks as well!</p>
                                        </div>
                                        <div className="actions">
                                            <a className="reply">Reply</a>
                                        </div>
                                    </div>
                                    <div className="comments">
                                        <div className="comment">
                                            <a className="avatar">
                                                <img src="https://semantic-ui.com/images/avatar/small/jenny.jpg" />
                                            </a>
                                            <div className="content">
                                                <a className="author">Jenny Hess</a>
                                                <div className="metadata">
                                                    <span className="date">Just now</span>
                                                </div>
                                                <div className="text">
                                                    Elliot you are always so right :)
                                        </div>
                                                <div className="actions">
                                                    <a className="reply">Reply</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment">
                                    <a className="avatar">
                                        <img src="https://semantic-ui.com/images/avatar/small/joe.jpg" />
                                    </a>
                                    <div className="content">
                                        <a className="author">Joe Henderson</a>
                                        <div className="metadata">
                                            <span className="date">5 days ago</span>
                                        </div>
                                        <div className="text">
                                            Dude, this is awesome. Thanks so much
                                </div>
                                        <div className="actions">
                                            <a className="reply">Reply</a>
                                        </div>
                                    </div>
                                </div>
                                <form className="ui reply form">
                                    <div className="field">
                                        <textarea></textarea>
                                    </div>
                                    <div className="ui blue labeled submit icon button">
                                        <i className="icon edit"></i> Add Reply
                            </div>
                                </form>
                            </div>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>

        );
    }
}
