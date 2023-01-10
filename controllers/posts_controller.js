const Post = require('../models/posts');
const Comment = require('../models/comments');
const User = require('../models/user');



module.exports.posts = async function (req, res) {

    if (!req.isAuthenticated()) {
        return res.redirect('/sign-in');
    }
    //pre populate the user information

    try {
        //pre populate the user information
        let post = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });


        let users = await User.find({});

        return res.render('posts', {
            title: "User post",
            post: post,
            all_users: users
        });
    } catch (err) {
        console.log('Error :', err);
        return;
    }
    // Post.find({})
    //     .populate('user')
    //     .populate({
    //         path: 'comments',
    //         populate: {
    //             path: 'user'
    //         }
    //     })
    //     .exec(function (err, post) {

    //         User.find({}, function (err, users) {
    //             return res.render('posts', {
    //                 title: "User post",
    //                 post: post,
    //                 all_users: users
    //             });
    //         })

    //     })

};


module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id

    }, function (err, post) {
        if (err) {
            req.flash('error', 'Post creation failed');
            console.log('error in creating post');
            return;
        }
        req.flash('success', 'Post Published');
        return res.redirect('back');
    });
}

module.exports.destroy = function (req, res) {
    Post.findById(req.params.id, function (err, post) {

        //.id means converting the id into string
        if (post.user == req.user.id) {
            post.remove();
            req.flash('success', 'Post and associated comments are deleted');
            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('back');
            });

        } else {
            req.flash('error', 'Only creator can delete post');
            return res.redirect('back');
        }
    })
}