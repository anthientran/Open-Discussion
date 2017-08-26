import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import HomePage from './../ui/HomePage';
import Main from './../ui/Main';
import TopicDetailPage from './../ui/TopicDetailPage';
import Voting from './../ui/Voting';
import Discussion from './../ui/Discussion';
import Login from './../ui/Login';
import Signup from './../ui/Signup';

export const onAuthChanged = () => {
    const isAuthenticated = !!Meteor.userId();

    if (isAuthenticated) {
        browserHistory.replace('/');
    }
};

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={HomePage} />
            <Route path="topics/:topicId" component={TopicDetailPage}>
                <Route path="voting" component={Voting} />
                <Route path="discussion" component={Discussion} />
            </Route>
        </Route>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
    </Router>
);
