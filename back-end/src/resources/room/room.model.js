import mongoose from 'mongoose'
import Moment from 'moment'

const moment = Moment()

const dateTime = moment.format('llll')

let Schema = mongoose.Schema

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: String,
        default: dateTime
    }
})

export const Room = mongoose.model("room", roomSchema)