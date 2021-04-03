const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
const cors = require('cors');
const TaskModel = require('./models/TaskModel');
const app = express();

require('dotenv').config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/write", (req, res) => {
    const taskName = req.body.taskName;

    const task = new TaskModel({
        taskName: taskName
    })

    task.save((err, result) => {
        if (err) {
            res.send(err);
        }
        console.log("saved to DB");
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

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndDelete(id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
})

app.listen(port, () => {
    console.log(`server started at port ${port}`);
})