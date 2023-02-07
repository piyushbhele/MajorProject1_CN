
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_coockie: 'something',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'bhele.piyush@gmail.com',
            pass: 'zmrcjixmfihnoaba'
        },
        enable_starttls_auto: true
    },
    strategy: {
        clientID: "424374943108-p075oiar5jknod16926qbdsm54aramea.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/auth/google/callback",
    },
    jwt_secret: 'codeial',

    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream }
    }
};

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_coockie: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        },
        enable_starttls_auto: true
    },
    strategy: {
        clientID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
        clientSecret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CODEIAL_GOOGLE_CALLBACK_URL
    },
    jwt_secret: process.env.CODEIAL_JWT_SECRET,

    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
};

//$env:ASSET_PATH="/assets"
console.log(eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT))
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);