import React from 'react';

export default class VotingOptionItem extends React.Component {
    render() {
        const { _id, title, selectedOptionId, onOptionChanged } = this.props;

        return (
            <div className="ui form">
                <div>
                    <label>Which solution do you support?</label>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input 
                                type="radio"
                                checked={selectedOptionId === _id}
                                onChange={() => onOptionChanged(_id)}
                            />
                            <label>{title}</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
