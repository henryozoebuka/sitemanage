import mongoose from 'mongoose'

const reportCommentsSchema = new mongoose.Schema({
    commentId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const ReportCommentsModel = mongoose.model('ReportComments', reportCommentsSchema)
export default ReportCommentsModel