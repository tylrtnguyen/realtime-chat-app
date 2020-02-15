import mongoose from 'mongoose'

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
            type: Date,
            default: Date.now
        }
    }
)

export const Admin = mongoose.model("admin", adminSchema)