import React from 'react';
import Banner from './Banner';
import TopicsList from './TopicsList';

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Banner />
                <TopicsList />
            </div>
        );
    }
}
