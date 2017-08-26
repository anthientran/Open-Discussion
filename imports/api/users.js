import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user)=> {
    const customizedUser = Object.assign({
        firstName: options.firstName,
        lastName: options.lastName
    }, user);

    return customizedUser;
});