//import model
const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('profile', {
        title: 'User Profile'
    })
}

//render the sign up page
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }

    return res.render('user_sign_up', {
        title: 'codeial | Sign Up'
    })
}

//render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }

    return res.render('user_sign_in', {
        title: 'codeial | Sign In'
    })
}

//get the Sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding user in signing up');
            return;
        }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('Error in creating user in signing up');
                    return;
                }

                return res.redirect('/sign-in');
            })
        } else {
            return res.redirect('back');
        }
    })
}



//create session
//npm install passport
//npm install passport-local
module.exports.createSession = function (req, res) {
    return res.redirect('/profile');
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        }
        // req.flash('success', "You have Logged out successfully");
        return res.redirect('/');
    });
}