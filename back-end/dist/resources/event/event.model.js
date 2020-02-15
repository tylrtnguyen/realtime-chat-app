"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require("../user/user.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
const eventSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    default: new Date().getHours()
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true
  }
});
exports.default = _mongoose2.default.model("event", eventSchema);