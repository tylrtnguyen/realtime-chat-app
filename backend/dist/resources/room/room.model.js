"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Room = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  created_at: {
    type: String,
    default: (0, _moment2.default)().format('llll')
  }
});

const Room = exports.Room = _mongoose2.default.model("room", roomSchema);