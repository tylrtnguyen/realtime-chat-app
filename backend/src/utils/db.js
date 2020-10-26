import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Add useNewUrlParser and UnifiedTopolgy to prevent warning
const connect = (url = process.env.DB_URI, opts = {}) => {
    mongoose.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology:true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    const connection = mongoose.connection;


    connection.once('open', () => {
        console.log('MongoDB database connection established successfully');
    });
}

module.exports = connect