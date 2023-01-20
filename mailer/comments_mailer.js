const nodeMailer = require('../config/nodemailer');

// This is new way of exporting a comment

exports.newComment = (comment) => {
    console.log('Inside newComment mailer');
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'bhele.piyush@gmail.com',
        to: comment.user.email,
        subject: "new Comment published",
        html: htmlString
    }, function (err, info) {
        if (err) {
            console.log('Error in sending email', err);
            return;
        }

        console.log('Email send', info);
        return;
    })
}