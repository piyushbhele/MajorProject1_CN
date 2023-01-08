const Post = require('../models/posts');
const Comment = require('../models/comments');



module.exports.posts = function (req, res) {
    // return res.end('<h1>Express is up for codial</h1>');
    // Post.find({}, function (err, post) {
    //     return res.render('posts', {
    //         title: "HoUser post",
    //         all_post: post
    //     });
    // })

    if (!req.isAuthenticated()) {
        return res.redirect('/sign-in');
    }
    //pre populate the user information
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, post) {
            return res.render('posts', {
                title: "User post",
                post: post
            });
        })

};


module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) {
            console.log('error in creating post');
            return;
        }

        return res.redirect('back');
    });
}

module.exports.destroy = function (req, res) {
    Post.findById(req.params.id, function (err, post) {

        //.id means converting the id into string
        if (post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('back');
            });

        } else {
            return res.redirect('back');
        }
    })
}