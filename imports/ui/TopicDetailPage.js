import React from 'react';
import { Link } from 'react-router';

export default class TopicDetailPage extends React.Component {
    state = {
        topic: null,
        options: []
    };

    render() {
        const topicId = this.props.params.topicId;

        return (
            <div>
                Topic details page
                <p>Details of the topic</p>

                <div className="ui two top attached steps">
                    <Link className="active step" to={`/topics/${topicId}/voting`}>
                        <i className="announcement icon"></i>
                        <div className="content">
                            <div className="title">Voting</div>
                            <div className="description">Cast your vote</div>
                        </div>
                    </Link>
                    <Link className="active step" to={`/topics/${topicId}/discussion`}>
                        <i className="comments icon"></i>
                        <div className="content">
                            <div className="title">Discussion</div>
                            <div className="description">Join the discussion</div>
                        </div>
                    </Link>
                </div>
                <div className="ui attached segment">
                    {React.cloneElement(this.props.children, { topicId })}
                </div>
            </div>
        );
    }
}