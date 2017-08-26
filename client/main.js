import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { routes, onAuthChanged } from './../imports/routes/routes';

import { Options } from './../imports/api/options';
import { Votes } from './../imports/api/votes';
import { Comments } from './../imports/api/comments';

Tracker.autorun(() => {
  onAuthChanged();
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById("app"));
});
