const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'bhele.piyush@gmail.com',
        pass: 'zmrcjixmfihnoaba'
    },
    enable_starttls_auto: true
});

let renderTemplate = function (data, relativePath) {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) { console.log('error in rendering file', err) };

            mailHTML = template;
        }
    );
    return mailHTML;
};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
