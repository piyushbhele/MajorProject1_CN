//set up express server
const express = require('express');
const app = express();
const port = 8000;

//set up cookie
const cookieParser = require('cookie-parser');


//Used for session cookie
//npm install express-session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


//conncting to database
const db = require('./config/mongoose');

//express layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//extract styles and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Read through post requests
app.use(express.urlencoded());

//use cookie parser
app.use(cookieParser());

//use sattic files
app.use(express.static('./assets'));



// set views
app.set('view engine', 'ejs');
app.set('views', './views');


//Use session library to encode the key
app.use(session({
    name: 'codeial',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/', require('./routes'));

//fire server.
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the code : ${err}`);
    };

    console.log(`Server is running on port : ${port}`);
});