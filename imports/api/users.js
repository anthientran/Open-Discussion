import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

Accounts.onCreateUser((options, user)=> {
    user.profile = options.profile;

    return user;
});

Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    try {
        new SimpleSchema({
            email: {
                type: String,
                regEx: SimpleSchema.RegEx.Email
            }
        }).validate({email});
    } catch (e) {
        throw new Meteor.Error(400, e.message);
    }

    return true;
});