"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chat = require("./chat.controllers");

var _chat2 = _interopRequireDefault(_chat);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // /api/chat

router.route('/').get(_chat2.default.getAllItems).post(_chat2.default.addItem); // /api/chat/:id

router.route('/:id').get(_chat2.default.getOneItem).put(_chat2.default.updateItem).delete(_chat2.default.removeItem);
exports.default = router;