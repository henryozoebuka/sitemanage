import mongoose, { Schema } from 'mongoose'

const reportsSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'No title for this report'
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const ReportsModel = mongoose.model('reports', reportsSchema)
export default ReportsModel