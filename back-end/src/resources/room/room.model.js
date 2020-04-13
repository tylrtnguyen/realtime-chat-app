import mongoose from 'mongoose'
import moment from 'moment'



const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: String,
        default: moment().format('llll')
    }
})

export const Room = mongoose.model("room", roomSchema)