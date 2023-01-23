const Post = require('../models/posts');
const Comment = require('../models/comments');
const User = require('../models/user');
const { deleteMany } = require('../models/tasks');
const Like = require('../models/like');



module.exports.posts = async function (req, res) {

    if (!req.isAuthenticated()) {
        return res.redirect('/sign-in');
    }
    //pre populate the user information

    try {
        //pre populate the user information
        let post = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
            }).populate('likes');



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


module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });


        if (req.xhr) {
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name');
            // post = await post.populate({ path: 'user', select: 'name' });
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }

}


module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {

            await Like.deleteMany({ likeable: post, onModel: 'Post' });
            await Like.deleteMany({ _id: { $in: post.comments } });

            post.remove();
            await Comment.deleteMany({ post: req.params.id });


            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }

}