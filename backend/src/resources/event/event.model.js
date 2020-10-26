import mongoose from 'mongoose'
import moment from 'moment'


const Schema = mongoose.Schema

const eventSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    user: {
        type: String,
        require: true
    },
    source: {
        type: String,
        require: true 
    },
    date: {
        type: String,
        default: moment().format('ll')
    },
    time: {
        type: String,
        default: moment().format('LTS')
    }
})

export const Event = mongoose.model("event", eventSchema)