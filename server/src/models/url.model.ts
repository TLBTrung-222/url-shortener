// create url schema
import mongoose from 'mongoose'
const { Schema } = mongoose

const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    urlCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const UrlModel = mongoose.model('Url', urlSchema)
export default UrlModel
