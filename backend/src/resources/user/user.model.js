import mongoose from 'mongoose'
import os from 'os'
import { getIP } from '../../utils/ip'
import moment from 'moment'



const networkInterfaces = os.networkInterfaces();
const Schema = mongoose.Schema
const ip = getIP(networkInterfaces)

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please fill in your name']
    },
    joined_at: {
        type: String,
        default: moment().format('llll')
    }, 
    ip:{
        type: String,
        default: ip
    }
})

export const User = mongoose.model("user", userSchema)