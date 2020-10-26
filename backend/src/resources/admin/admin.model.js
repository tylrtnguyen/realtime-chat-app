import mongoose from 'mongoose'
import moment from 'moment'


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
            default: moment().format('llll')
        }
    }
)

export const Admin = mongoose.model("admin", adminSchema)