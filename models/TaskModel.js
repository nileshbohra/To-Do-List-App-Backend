const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        taskName: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('task', TaskSchema);