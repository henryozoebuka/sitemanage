import mongoose from 'mongoose'

const reportCommentsSchema = new mongoose.Schema({
    commentId: {type: mongoose.Schema.Types.ObjectId,
        ref: 'reports',
        required: true
    },
    comment: {
        
    }
})

const ReportCommentsModel = mongoose.model('ReportComments', reportCommentsSchema)
export default ReportCommentsModel