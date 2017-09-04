import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Comments } from './comments';
import { Options } from './options';

export const Opinions = new Mongo.Collection("opinions");

Opinions.helpers({
    user() {
        return Meteor.users.findOne(this.userId);
    },
    comments() {
        return Comments.find({opinionId: this._id});
    },
    option() {
        return Options.findOne(this.optionId);
    }
});
