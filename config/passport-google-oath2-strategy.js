const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use new strategy for google log in
passport.use(new googleStrategy({
    clientID: "424374943108-p075oiar5jknod16926qbdsm54aramea.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/auth/google/callback",
}, function (accessToken, refreshToken, profile, done) {
    //find user
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
        if (err) { console.log('error in google-strategy-password', err) };
        console.log(profile);

        if (user) {
            //if found set the user as req.user
            return done(null, user);
        } else {

            //if not, create the user and set as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function (err, user) {
                if (err) { console.log('error in creating google-strategy-password', err) };
                return done(null, user);
            })
        }
    })
}
));

module.exports = passport;