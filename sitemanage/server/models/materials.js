import mongoose from 'mongoose'

const materialsSchema = new mongoose.Schema({

    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    givenTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    removedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
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