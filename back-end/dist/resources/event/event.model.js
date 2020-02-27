"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require("../user/user.model");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const moment = (0, _moment2.default)();
const dateTime = moment.format('llll');
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
  },
  created_at: {
    type: String,
    default: dateTime
  }
});

const Event = exports.Event = _mongoose2.default.model("event", eventSchema);