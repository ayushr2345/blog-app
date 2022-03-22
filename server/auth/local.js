const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models/user.model');
const { verifyPassword } = require('./pwUtils');
const init = require('./init');

passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return done(err, { error: err });
        }
        if (!user) {
            return done(null, false, { message: "User not found" });
        }
        if (verifyPassword(password, user.hash, user.salt)) {
            return done(null, user, { message: "User not" });
        } else {
            return done(null, false, { message: "Passwords don't match" });
        }
    });
}));

passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((userId, done) => {
        User.findById(userId)
            .then((user) => {
                done(null, user);
            })
            .catch(err => done(err))
    });
//init();

module.exports = passport;