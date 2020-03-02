"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
const eventSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  user: {
    type: String,
    require: true
  },
  source: {
    type: String,
    require: true
  },
  date: {
    type: String,
    default: (0, _moment2.default)().format('ll')
  },
  time: {
    type: String,
    default: (0, _moment2.default)().format('LTS')
  }
});

const Event = exports.Event = _mongoose2.default.model("event", eventSchema);