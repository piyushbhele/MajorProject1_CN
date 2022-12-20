//set up express server
const express = require('express');
const app = express();
const port = 8000;

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


