const passport = require('passport');

module.exports = () => {
    // passport.serializeUser((user, done) => {
    //     done(null, user.id);
    // });

    // passport.deserializeUser((userId, done) => {
    //     User.findById(userId)
    //         .then((user) => {
    //             done(null, user);
    //         })
    //         .catch(err => done(err))
    // });
    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
        cb(null, { id: user.id, email: user.email });
        });
    });
    
    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
        return cb(null, user);
        });
    });
}