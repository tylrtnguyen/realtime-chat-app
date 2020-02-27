import mongoose from 'mongoose'
import Moment from 'moment'

const moment = Moment()

const dateTime = moment.format('llll')

const Schema = mongoose.Schema

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            max :255
        },
        email: {
            type: String,
            required: true,
            unique: true,
            min: 8
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        created_at: {
            type: String,
            default: dateTime
        }
    }
)

export const Admin = mongoose.model("admin", adminSchema)