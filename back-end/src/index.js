import express from 'express'
import socketio from 'socket.io'
import http from 'http'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './utils/router'
import connect from './utils/db'
import { register, login, protect} from './utils/auth'
import adminRouter from './resources/admin/admin.router'
import chatRouter from './resources/chat/chat.router'
import eventRouter from './resources/event/event.router'
import userRouter from './resources/user/user.router'


dotenv.config()

// PORT declare
const port = process.env.PORT || 5000;

// Configure express application
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(router)

// Authentication routes
app.post('/register', register);
app.post('/login', login);

// API routes
app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/event', eventRouter);
app.use('/api/chat', chatRouter);

// Create server
const server = http.createServer(app);


// SocketIO section
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('We have a new connection');

    socket.on('disconnect', () => {
        console.log('User had left!')
    })
})




const start = async () => {
    try {
      await connect()
      server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
      })
    } catch (e) {
      console.error(e)
    }
  }

start()
  






