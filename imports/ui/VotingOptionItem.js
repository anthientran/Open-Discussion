import React from 'react';
import PropTypes from 'prop-types';

export default class VotingOptionItem extends React.Component {
    render() {
        const { _id, title, description, selectedOptionId, onOptionChanged, voteCount } = this.props;

        const isOptionSelected = selectedOptionId === _id;

        const renderComment = () => {
            if (isOptionSelected) {
                return (
                    <div className="ui form">
                        <div className="field">
                            <label>Why do you support this option? (Optional)</label>
                            <textarea
                                rows="3"
                                onChange={this.props.onCommentChange}
                                value={this.props.votingComment}
                            >
                            </textarea>
                        </div>
                    </div>
                );
            }
        };

        return (
            <div className="item">
                <div className="right floated content">
                    <h3>{voteCount}</h3>
                </div>

                <div className="ui image">
                    <input
                        type="radio"
                        checked={isOptionSelected}
                        onChange={() => onOptionChanged(_id)}
                    />
                </div>
                <div className="content">
                    <div className="header">
                        {title}
                    </div>
                    {description}

                    {renderComment()}
                </div>
            </div>
        );
    }
}

VotingOptionItem.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    selectedOptionId: PropTypes.string,
    onOptionChanged: PropTypes.func.isRequired,
}