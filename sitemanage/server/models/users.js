import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true,
    },

    role: {
        type: String
    },

    balance: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model('users', userSchema)
export default UserModel