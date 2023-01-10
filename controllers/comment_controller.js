const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                post.comments.push(comment);
                post.save();
                res.redirect('back');
            })
            req.flash('success', 'comment added');
        }
    })
}

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {

        //.id means converting the id into string
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            req.flash('success', 'commnent deleted');

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                return res.redirect('back');
            })


        } else {
            return res.redirect('back');
        }
    })
}