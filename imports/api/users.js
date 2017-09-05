import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

Accounts.onCreateUser((options, user)=> {
    const customizedUser = Object.assign({
        firstName: options.firstName,
        lastName: options.lastName
    }, user);

    return customizedUser;
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