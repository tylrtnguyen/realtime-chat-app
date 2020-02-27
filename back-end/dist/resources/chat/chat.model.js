"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const moment = (0, _moment2.default)();
const dateTime = moment.format('llll');
const Schema = _mongoose2.default.Schema;
const chatSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  created_at: {
    type: String,
    default: dateTime
  }
});

const Chat = exports.Chat = _mongoose2.default.model("chat", chatSchema);