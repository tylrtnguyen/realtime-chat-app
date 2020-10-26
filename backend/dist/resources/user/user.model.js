"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _ip = require("../../utils/ip");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const networkInterfaces = _os2.default.networkInterfaces();

const Schema = _mongoose2.default.Schema;
const ip = (0, _ip.getIP)(networkInterfaces);
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please fill in your name']
  },
  joined_at: {
    type: String,
    default: (0, _moment2.default)().format('llll')
  },
  ip: {
    type: String,
    default: ip
  }
});

const User = exports.User = _mongoose2.default.model("user", userSchema);