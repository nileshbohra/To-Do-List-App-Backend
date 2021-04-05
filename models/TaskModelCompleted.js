const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchemaCompleted = new Schema(
    {
        taskName: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('taskcompleted', TaskSchemaCompleted);