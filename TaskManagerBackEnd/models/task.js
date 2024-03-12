const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    content : {
        type: String,
        required: true
    },
    completed : {
        type: Boolean,
        required: true
    },
    priority : {
        type : Number,
        required : true
    }
});

const Task = mongoose.model('Task', taskSchema);


module.exports = Task;