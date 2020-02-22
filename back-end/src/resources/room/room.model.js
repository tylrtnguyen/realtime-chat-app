import mongoose from 'mongoose'
import User from '../user/user.model'

let Schema = mongoose.Schema

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    joined_user:[User],
    created_at: {
        type: Date,
        default: Date.now
    }
})

export const Room = mongoose.model("room", roomSchema)