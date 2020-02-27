import mongoose from 'mongoose'
import {User} from '../user/user.model'
import Moment from 'moment'

const moment = Moment()

const dateTime = moment.format('llll')

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
    },
    created_at: {
        type: String,
        default: dateTime
    }
})

export const Event = mongoose.model("event", eventSchema)