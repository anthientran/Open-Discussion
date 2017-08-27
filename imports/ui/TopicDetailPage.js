import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

const VOTING = 'voting';
const DISCUSSION = 'discussion';

export default class TopicDetailPage extends React.Component {

    state = {
        activeStep: VOTING
    };

    render() {
        const topicId = this.props.params.topicId;
        const { activeStep } = this.state;

        return (
            <div>
                Topic details page
                <p>Details of the topic</p>

                <div className="ui two top attached steps">
                    <Link 
                        className={classNames("step", {"active": activeStep === VOTING})}
                        to={`/topics/${topicId}/${VOTING}`}
                        onClick={() => this.handleLinkClicked(VOTING) }
                    >
                        <i className="announcement icon"></i>
                        <div className="content">
                            <div className="title">Voting</div>
                            <div className="description">Cast your vote</div>
                        </div>
                    </Link>
                    <Link
                        onClick={() => this.handleLinkClicked(DISCUSSION) }
                        className={classNames("step", {"active": activeStep === DISCUSSION})}
                        to={`/topics/${topicId}/${DISCUSSION}`}
                    >
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

    handleLinkClicked = (currentStep) => {
        this.setState({
            activeStep: currentStep
        });
    }
}