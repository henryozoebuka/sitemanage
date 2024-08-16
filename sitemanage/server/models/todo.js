import mongoose from  'mongoose'

const toDoSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    title: {
        type: String,
        default: 'No title'
    },

    description: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const ToDoModel = mongoose.model('todo', toDoSchema)
export default ToDoModel