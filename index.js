//set up express server
const express = require('express');
const app = express();
const port = 8000;

//conncting to database
const db = require('./config/mongoose');

//express layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//extract styles and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use sattic files
app.use(express.urlencoded());
app.use(express.static('./assets'));

//use express router
app.use('/', require('./routes'));

// set views
app.set('view engine', 'ejs');
app.set('views', './views');


//fire server.
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the code : ${err}`);
    };

    console.log(`Server is running on port : ${port}`);
});