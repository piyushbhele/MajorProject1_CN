//set up express server
const express = require('express');
const app = express();
const port = 8000;

//set up cookie
const cookieParser = require('cookie-parser');
//express layouts
const expressLayouts = require('express-ejs-layouts');
//conncting to database
const db = require('./config/mongoose');

const env = require('./config/enviornment');
const path = require('path');

//Used for session cookie
//npm install express-session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oath2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const logger = require('morgan');
require('./config/view_helpers')(app);


//set up the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is running on port 5000');



app.use(expressLayouts);
app.use(logger(env.morgan.mode, env.morgan.options));

//extract styles and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


if (env.name == 'development') {
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, '/scss'),
        // './assets/scss',
        dest: path.join(__dirname, env.asset_path, '/css'),
        // './assets/css',
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}




//Read through post requests
app.use(express.urlencoded({ extended: false }));

//use cookie parser
app.use(cookieParser());

//make the upload path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//use sattic files
app.use(express.static(env.asset_path));




// set views
app.set('view engine', 'ejs');
app.set('views', './views');


//Use session library to encode the key
app.use(session({
    name: 'codeial',
    secret: env.session_coockie,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: `mongodb://127.0.0.1/${env.db}`,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);


//use express router
app.use('/', require('./routes'));

//fire server.
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the code : ${err}`);
    };

    console.log(`Server is running on port : ${port}`);
});
