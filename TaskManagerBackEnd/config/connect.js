// Importing Mongoose
const mongoose = require ('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/TaskManager')
    .then(
        () => {
            console.log('connected to database'); 
        }
    )
    .catch(
        (err) => {
            console.log(err);
        }
    );

// Exporting the Mongoose instance
module.exports = mongoose;