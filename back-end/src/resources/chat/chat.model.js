import mongoose from 'mongoose'
import Moment from 'moment'

const moment = Moment()

const dateTime = moment.format('llll')

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
        default: dateTime
    }
})

export const Chat = mongoose.model("chat", chatSchema)