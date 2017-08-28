import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { routes, onAuthChanged } from './../imports/routes/routes';

Tracker.autorun(() => {
  onAuthChanged();
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById("app"));
});
