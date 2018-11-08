const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const user_table = require('../models').User;

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'user_id',
        passwordField: 'password',
    }, async function(user_id, password, done) {
        try {
            const isExist = await user_table.find({
                where: {user_id : user_id}
            });
            if(isExist) {
                const result = await bcrypt.compare(password, isExist.password);
                if(result) {
                    done(null, isExist);
                } else {
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }
            } else {
                done(null, false, {message: '가입되지 않은 회원입니다.'});
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
};