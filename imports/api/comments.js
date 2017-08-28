import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Comments = new Mongo.Collection("comments");

Comments.helpers({
    user() {
        return Meteor.users.findOne(this.userId);
    }
});