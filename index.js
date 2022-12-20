//set up express server
const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/', require('./routes/index'));

//fire server.
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the code : ${err}`);
    };

    console.log(`Server is running on port : ${port}`);
});


