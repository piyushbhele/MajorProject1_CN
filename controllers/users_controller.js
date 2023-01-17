//import model
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('profile', {
            title: 'User Profile',
            profile_user: user

        });
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
        const id = req.user.id;
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
    req.flash('success', 'You are logged in successfully');
    return res.redirect(`/profile/${req.user.id}`);
}

module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('error', err);
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    // if (user.avatar) {
                    //     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    // }
                    //this is saving the path of the uploaded file into avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;

                }
                user.save();
                return res.redirect('back');
            })

        } catch (err) {
            req.flash('error', err);
            return;
        }

    } else {
        return res.status(401).send('unauthorised user');
    }
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        }
        req.flash('success', "You are Logged out successfully");
        return res.redirect('/');
    });
}