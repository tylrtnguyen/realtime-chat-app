"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  date: {
    type: Date,
    default: Date.now
  },
  room: {
    type: String,
    required: true
  }
});

const Chat = exports.Chat = _mongoose2.default.model("chat", chatSchema);