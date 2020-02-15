import mongoose from 'mongoose'
import {User} from '../user/user.model'

const Schema = mongoose.Schema

const eventSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        default: new Date().getHours()
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
})

export default mongoose.model("event", eventSchema)