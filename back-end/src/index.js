import express from 'express'
import socketio from 'socket.io'
import http from 'http'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './utils/router'
import connect from './utils/db'
import cors from 'cors'
import colors from 'colors'
import morgan from 'morgan'
import { register, login, protect} from './utils/auth'
import adminRouter from './resources/admin/admin.router'
import chatRouter from './resources/chat/chat.router'
import eventRouter from './resources/event/event.router'
import userRouter from './resources/user/user.router'
import roomRouter from './resources/room/room.router'
import historyRouter from './resources/history/history.router'


dotenv.config()

// PORT declare
const port = process.env.PORT || 5000;

// Configure express application
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(router)
app.use(cors())

// Authentication routes
app.post('/register', register);
app.post('/login', login);

// API routes
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/room', roomRouter);
app.use('/api/auth', protect);
app.use('/api/auth/admin', adminRouter);
app.use('/api/auth/event', eventRouter);
app.use('/api/auth/history', historyRouter);



// Create server
const server = http.createServer(app);

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// SocketIO section
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('We have a new connection');

    socket.on('chat message', function(msg){
      console.log('Message: ' + JSON.stringify(msg))
      // Broadcast the message
      io.emit('chat message', msg);
    })

    socket.on('user joined', function(user) {
      console.log('User: ' + JSON.stringify(user))
      // Broadcast user
      io.emit('user joined', user)
    })


    socket.on('disconnect', () => {
        console.log('User had left!')
    })
})




const start = async () => {
    try {
      await connect()
      server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`.cyan.bold)
      })
    } catch (e) {
      console.error(e)
    }
  }

start()
  






