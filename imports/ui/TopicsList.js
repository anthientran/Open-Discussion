import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Topics } from './../api/topics'; 
import TopicItem from './TopicItem';

export default class TopicsList extends React.Component {
    state = {
        topics: []
    };

    render() {
        return (
            <div className="ui three cards">
                {this.state.topics.map((topic) => {
                    return <TopicItem key={topic._id} {...topic}/>
                })}
            </div>
        );
    }

    componentDidMount() {
        this.topicsTracker = Tracker.autorun(() => {
            const topics = Topics.find().fetch();
            this.setState({ topics });
        });
    }

    componentWillUnmount() {
        this.topicsTracker.stop();
    }
}
