import mongoose from 'mongoose'

const Schema = mongoose.Schema

const chatSchema = new Schema({
    author: {
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

export const Chat = mongoose.model("chat", chatSchema)