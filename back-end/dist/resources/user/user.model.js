"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _ip = require("../../utils/ip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const networkInterfaces = _os2.default.networkInterfaces();

const Schema = _mongoose2.default.Schema;
const ip = (0, _ip.getIP)(networkInterfaces);
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  joined_at: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String
  }
});
exports.default = _mongoose2.default.model("user", userSchema);