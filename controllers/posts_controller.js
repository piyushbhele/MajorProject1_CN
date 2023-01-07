const Post = require('../models/posts');



module.exports.posts = function (req, res) {
    // return res.end('<h1>Express is up for codial</h1>');
    // Post.find({}, function (err, post) {
    //     return res.render('posts', {
    //         title: "HoUser post",
    //         all_post: post
    //     });
    // })

    //pre populate the user information
    Post.find({}).populate('user').exec(function (err, post) {
        return res.render('posts', {
            title: "HoUser post",
            all_post: post
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