import mongoose from 'mongoose'

const Schema = mongoose.Schema

const chatSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    room: {
        type: String,
        required: true
    }
})

export default mongoose.model("chat", chatSchema)