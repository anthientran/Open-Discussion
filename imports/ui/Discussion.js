import React from 'react';

export default class Discussion extends React.Component {
    render() {
        return (
            <div>
                <h1>Discussion</h1>

                <p>From discussion, {this.props.topicId}</p>
            </div>
        );
    }
}
