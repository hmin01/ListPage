const local = require('./localStrategy');
const user_table = require('../models').User;

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.user_id);
    });

    passport.deserializeUser(function (user_id, done) {
        user_table.find({
            where: { user_id: user_id }
        })
            .then(function(user) {
                done(null, user);
            })
            .catch(function(err) {
                done(err);
            });
    });
    local(passport);
};