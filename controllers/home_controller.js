//import schema or task
const Task = require('../models/tasks')

//render the home page on browser
module.exports.home = function (req, res) {
    // return res.end('<h1>Express is up for codial</h1>');
    Task.find({}, function (err, tasks) {
        return res.render('home', {
            title: "Home",
            tasks_list: tasks
        });
    })

};


//create a new task
module.exports.createTask = function (req, res) {
    Task.create({
        discription: req.body.discription,
        date: req.body.date,
        catagory: req.body.catagory
    }, function (err, newTasks) {
        if (err) {
            console.log('error in creating task');
            return;
        }
        console.log('**********', newTasks);
        return res.redirect('/');
    })
};

//delete a task
module.exports.deleteTask = function (req, res) {
    let id = req.query.id;
    console.log(id);
    Task.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('error in deleting contact');
            return;
        }
    })
    return res.redirect('/');
};

module.exports.deleteCheckbox = function (req, res) {
    let targetTask = req.body;
    console.log('Hello there', targetTask);

    let obj = [];
    for (itr in targetTask) {
        const { ObjectId } = require('mongodb');
        const _id = ObjectId(itr);
        obj.push(_id);
    }
    console.log(obj);

    for (itr of obj) {
        Task.findByIdAndDelete(itr, function (err) {
            if (err) {
                console.log('Error occured ', err.message);
                return;
            }
        });
    }

    return res.redirect('back');

}