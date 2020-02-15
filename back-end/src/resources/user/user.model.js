import mongoose from 'mongoose'
import os from 'os'
import { getIP } from '../../utils/ip'


const networkInterfaces = os.networkInterfaces();
const Schema = mongoose.Schema
const ip = getIP(networkInterfaces)

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    joined_at: {
        type: Date,
        default: Date.now
    }, 
    ip:{
        type: String
    }
})

export const User = mongoose.model("user", userSchema)