"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _router = require("./utils/router");

var _router2 = _interopRequireDefault(_router);

var _db = require("./utils/db");

var _db2 = _interopRequireDefault(_db);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _colors = require("colors");

var _colors2 = _interopRequireDefault(_colors);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _auth = require("./utils/auth");

var _admin = require("./resources/admin/admin.router");

var _admin2 = _interopRequireDefault(_admin);

var _chat = require("./resources/chat/chat.router");

var _chat2 = _interopRequireDefault(_chat);

var _event = require("./resources/event/event.router");

var _event2 = _interopRequireDefault(_event);

var _user = require("./resources/user/user.router");

var _user2 = _interopRequireDefault(_user);

var _room = require("./resources/room/room.router");

var _room2 = _interopRequireDefault(_room);

var _history = require("./resources/history/history.router");

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); // PORT declare


const port = process.env.PORT || 5000; // Configure express application

const app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use(_bodyParser2.default.json());
app.use(_router2.default);
app.use((0, _cors2.default)()); // Authentication routes

app.post('/register', _auth.register);
app.post('/login', _auth.login); // API routes

app.use('/api/user', _user2.default);
app.use('/api/chat', _chat2.default);
app.use('/api/room', _room2.default);
app.use('/api/auth', _auth.protect);
app.use('/api/auth/admin', _admin2.default);
app.use('/api/auth/event', _event2.default);
app.use('/api/auth/history', _history2.default); // Create server

const server = _http2.default.createServer(app);

if (process.env.NODE_ENV === 'development') {
  app.use((0, _morgan2.default)('dev'));
} // SocketIO section


const io = (0, _socket2.default)(server);
io.on('connection', socket => {
  console.log('We have a new connection');
  socket.on('chat message', function (msg) {
    console.log('Message: ' + JSON.stringify(msg)); // Broadcast the message

    io.emit('chat message', msg);
  });
  socket.on('user joined', function (user) {
    console.log('User: ' + JSON.stringify(user)); // Broadcast user

    io.emit('user joined', user);
  });
  socket.on('disconnect', () => {
    console.log('User had left!');
  });
});

const start = async () => {
  try {
    await (0, _db2.default)();
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`.cyan.bold);
    });
  } catch (e) {
    console.error(e);
  }
};

start();