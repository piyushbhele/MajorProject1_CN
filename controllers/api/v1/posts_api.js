const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');

module.exports.index = async function (req, res) {

    let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of posts",
        posts: post
    })
}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {

            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            return res.json(200, {
                message: "List of posts and comments associated with it are deleted",
            })
        } else {
            return res.json(401, {
                message: "You can not delete this post"
            })
        }

    } catch (err) {
        console.log('**********', err);
        return res.json(500, {
            message: "Internal Server error"
        })
    }

}