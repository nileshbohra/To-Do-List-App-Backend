const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
const cors = require('cors');
const TaskModel = require('./models/TaskModel');
const TaskModelCompleted = require('./models/TaskModelCompleted');

const app = express();

require('dotenv').config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/create", (req, res) => {
    const taskName = req.body.taskName;

    const task = new TaskModel({
        taskName: taskName
    })

    task.save((err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
});

app.post('/createCompleted', (req, res) => {
    const taskName = req.body.taskNameCompleted.taskName;

    const task = new TaskModelCompleted({
        taskName: taskName
    })

    task.save((err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
});

app.get("/read", (req, res) => {
    TaskModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});
app.get("/readCompleted", (req, res) => {
    TaskModelCompleted.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndDelete(id, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
    })
})
app.delete('/deleteCompleted/:id', (req, res) => {
    const id = req.params.id;
    TaskModelCompleted.findByIdAndDelete(id, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const taskName = req.body.taskName;
    TaskModel.findByIdAndUpdate(id, { taskName: taskName }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            console.log(data);
            res.send(data);
        }
    })
})

app.listen(port, () => {
    console.log(`server started at port ${port}`);
})