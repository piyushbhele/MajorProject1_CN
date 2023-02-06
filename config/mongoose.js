//require the library
const mongoose = require('mongoose');
const env = require('./enviornment');
//connect to database
mongoose.connect(`mongodb://127.0.0.1/${env.db}`);
// mongoose.connect('mongodb://0.0.0.0:27017/test');

//aquire the connection to see if it is successful
const db = mongoose.connection;

//print error if there
db.on('error', console.error.bind(console, 'error connecting to database'));

//up and running the print message
db.once('open', function () {
    console.log('successfully connected to data base');
});

module.exports = db;
