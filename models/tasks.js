//create a schema
const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    discription: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    catagory: {
        type: String,
        required: true
    }
});

const Tasks = mongoose.model('Tasks', taskSchema);
module.exports = Tasks;