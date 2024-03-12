const express = require('express');
const Task = require ('./models/task');
const app = express();
require('./config/connect');
const cors = require('cors');
const userApi = require('./router/user');


app.use(express.json());
app.use(cors());
app.use('/user',userApi);

app.get('/all',async (req, res)=> {

    try{
    // Fetching all tasks from DB
    tasks = await Task.find();

    res.status(200).send(tasks);
    }catch(error){
        res.status(400).send(error);
    }

});

app.post('/add', async(req, res)=>{

    try{
        data = req.body;
        console.log(data);
        newTask = new Task(data);
        savedTask= await newTask.save();
        res.status(200).send(savedTask);
    }catch(error){
        res.status(400).send(error);
    }
});

app.put('/update/:id',  async (req, res)=>{
    const myId = req.params.id;
    const newTaskData = req.body;
    const UpdatedTask = await Task.findByIdAndUpdate({_id: myId}, newTaskData);

})

app.delete('/delete/:id', async (req, res)=>{
    try{
        const myId = req.params.id;
        const deletedTask= await Task.findByIdAndDelete({_id: myId});
        res.status(200).send(deletedTask);

    }catch(error){
        res.status(400).send(error);

    }

})

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
})