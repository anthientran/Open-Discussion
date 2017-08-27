import { Meteor } from 'meteor/meteor';
import { Topics } from './../imports/api/topics';
import { Options } from './../imports/api/options';
import { Votes } from './../imports/api/votes';
import { Comments } from './../imports/api/comments';

Meteor.startup(() => {
  
  // code to run on server at startup
  /* Options.insert({
    forTopic: 'hwLshfgxoMkvhGuhE',
    title: 'Option 1',
    description: 'Description for option 1'
  });

  Options.insert({
    forTopic: 'hwLshfgxoMkvhGuhE',
    title: 'Option 2',
    description: 'Description for option 1. This can be really long. I am not certain'
  }); */

  /* Topics.insert({
    name: 'Remove the separator in trash bins'
  });

  Topics.insert({
    name: 'Another topic'
  }); */
});
