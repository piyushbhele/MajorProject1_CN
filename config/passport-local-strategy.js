const passport = require('passport');
const localStrategy = require('passport-local');

const User = require('../models/user');

//authentication using passport
passport.use(new localStrategy({
    usernameField: 'email'
},

    //find a user and establish the identity
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid username or password');
                return done(null, false);
            }

            return done(null, user);

        })
    }
));

//serializing the user to decide which key to be kept in the cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

//deserializing the user from the key in the cookie
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);

    });
});

module.exports = passport;