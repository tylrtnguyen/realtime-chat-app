"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _history = require("./history.controllers");

var _history2 = _interopRequireDefault(_history);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.route('/').get(_history2.default.getAllItems);
router.route('/:roomname').get(_history2.default.getChatByRoom);
exports.default = router;