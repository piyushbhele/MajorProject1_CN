module.exports.posts = function (req, res) {
    return res.render('posts', {
        title: 'User posts'
    })
}