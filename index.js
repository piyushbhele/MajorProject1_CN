//set up express server
const express = require('express');
const app = express();
const port = 8000;

//connecting to database
const db = require('./config/mongoose');
// const Tasks = require('./models/tasks');

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



// app.get('/', function (req, res) {
//     Tasks.find({}, function (err, tasks) {
//         if (err) {
//             console.log('getting error in fetching data');
//             return;
//         }

//         return res.render('home.ejs', {
//             title: "My task list",
//             tasks_list: tasks
//         });
//     })
// })

// app.post('/create-tasks', function (req, res) {
//     Tasks.create({
//         discription: req.body.discription,
//         date: req.body.date,
//         catagory: req.body.catagory
//     }, function (err, newTasks) {
//         if (err) {
//             console.log('error in creating task');
//             return;
//         }
//         console.log('**********', newTasks);
//         return res.redirect('/');
//     })
// })

//fire server.
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the code : ${err}`);
    };

    console.log(`Server is running on port : ${port}`);
});


