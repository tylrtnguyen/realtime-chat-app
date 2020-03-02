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
import { register, login, join, protect} from './utils/auth'
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
app.post('/join', join)

// API routes
app.use('/api', protect)
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/room', roomRouter);
app.use('/api/admin', adminRouter);
app.use('/api/eventlog', eventRouter);
app.use('/api/history', historyRouter);

app.get('/', (req, res) => {
  res.send("API is working!")
})



// Create server
const server = http.createServer(app);

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// SocketIO section
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('We have a new connection');

    socket.on('chat message', function(msg) {
      // Broadcast the message
      io.in(msg.room).emit('chat message', msg);
    })

    // User join the app
    socket.on('user joined', function(user) {
      console.log('User: ' + JSON.stringify(user))
      // Broadcast user
      io.emit('user joined', user)
    })


    // Join room
    socket.on('join room', function(joinRoomEvent) {
      const { room} = joinRoomEvent
      console.log('Join Room: ' + JSON.stringify(joinRoomEvent))
      socket.join(joinRoomEvent.room)
      io.in(room).emit('join room', joinRoomEvent)
    })

    // Leave room
    socket.on('leave room', function(leaveRoomEvent) {
      const { room } = leaveRoomEvent
      console.log('Leave Room: ' + JSON.stringify(leaveRoomEvent))
      io.in(room).emit('leave room', leaveRoomEvent)
      socket.leave(leaveRoomEvent.room)
    })

    socket.on('user left', function(user) {
      io.emit('user left', user)
    })

    socket.on('disconnect', function() {
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
  






