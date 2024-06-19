import mongoose from 'mongoose'

const materialsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },

    addedBy: {
        type: mongoose.Schema.Types.ObjectId
    },

    usedBy: {
        type: mongoose.Schema.Types.ObjectId
    },

    name: {
        type: String,
        required: true,
    },

    quantity: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const MaterialsModel = mongoose.model('materials', materialsSchema)
export default MaterialsModel