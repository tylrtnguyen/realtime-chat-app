import mongoose from 'mongoose'
import os from 'os'
import { getIP } from '../../utils/ip'
import Moment from 'moment'

const moment = Moment()

const dateTime = moment.format('llll')


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
        default: dateTime
    }, 
    ip:{
        type: String,
        default: ip
    }
})

export const User = mongoose.model("user", userSchema)