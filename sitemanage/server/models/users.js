import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    accountNumber: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        default: 'test',
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

    contactAddress: {
        type: String,
        default: 'Update your contact address.'
    },

    phoneNumber: {
        type: String,
        default: 'Update your phone number.'
    },

    role: {
        type: String,
        default: 'user'
    },

    balance: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        default: 'inactive'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    photo: {
        type: String,
        default: '',
    }
})

const UserModel = mongoose.model('users', userSchema)
export default UserModel