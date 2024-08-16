import mongoose, { Schema } from 'mongoose'

const expensesSchema = new Schema({
    spenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    item: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const ExpensesModel = mongoose.model('expenses', expensesSchema)
export default ExpensesModel