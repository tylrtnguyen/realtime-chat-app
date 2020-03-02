import mongoose from 'mongoose'
import moment from 'moment'


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
    room: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        default: moment().format('llll')
    }
})

export const Chat = mongoose.model("chat", chatSchema)