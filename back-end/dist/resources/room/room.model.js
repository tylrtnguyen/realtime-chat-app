"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Room = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require("../user/user.model");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Schema = _mongoose2.default.Schema;
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  joined_user: [_user2.default],
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Room = exports.Room = _mongoose2.default.model("room", roomSchema);