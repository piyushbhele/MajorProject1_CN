//import model
const User = require('../models/user');
const { use } = require('../routes/users');

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if (user) {
                return res.render('profile', {
                    title: 'User Profile',
                    user: user
                })
            }

            return res.redirect('/sign-in');
        });
    } else {
        return res.redirect('/sign-in');
    }
}

//render the sign up page
module.exports.signUp = function (req, res) {
    console.log(req.cookies);
    res.cookie('user_id', 25);
    return res.render('user_sign_up', {
        title: 'codeial | Sign Up'
    })
}

//render the sign in page
module.exports.signIn = function (req, res) {
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


// Sign in and create session for the user
module.exports.createSession = function (req, res) {
    //steps to authenticate
    //find the user

    User.findOne({ email: req.body.email }, function (err, user) {
        //handle password that don't match
        if (err) {
            console.log('Error in finding user in signing in');
            return;
        }


        if (user) {
            //handle password that dosen't match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/profile');

        } else {
            //handle user not found
            return res.redirect('back');
        }
    })

}