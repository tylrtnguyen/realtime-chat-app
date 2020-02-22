"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); // Add useNewUrlParser and UnifiedTopolgy to prevent warning


const connect = (url = process.env.DB_URI, opts = {}) => {
  _mongoose2.default.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const connection = _mongoose2.default.connection;

  _mongoose2.default.set('useFindAndModify', false);

  _mongoose2.default.set('useCreateIndex', true);

  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
};

module.exports = connect;