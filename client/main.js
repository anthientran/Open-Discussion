import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { routes } from './../imports/routes/routes';

import { Options } from './../imports/api/options';
import { Votes } from './../imports/api/votes';
import { Comments } from './../imports/api/comments';

Meteor.startup(() => {
/*   Topics.insert({
    name: 'This is a new topic',
    imageUrl: null
  }); */

  ReactDOM.render(routes, document.getElementById("app"));
});
