import mongoose from 'mongoose'
import moment from 'moment'


const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: 'Active'
    },
    created_at: {
        type: String,
        default: moment().format('llll')
    }
})

export const Room = mongoose.model("room", roomSchema)