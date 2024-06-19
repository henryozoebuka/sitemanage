import mongoose from 'mongoose'

const transactionsSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
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

const TransactionsModel = mongoose.model('funds', transactionsSchema)

export default TransactionsModel