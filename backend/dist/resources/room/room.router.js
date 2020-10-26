"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _room = require("./room.controllers");

var _room2 = _interopRequireDefault(_room);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // /api/room

router.route('/').get(_room2.default.getAllItems).post(_room2.default.addItem); // /api/room/:id

router.route('/:id').get(_room2.default.getOneItem).put(_room2.default.updateItem).delete(_room2.default.removeItem);
exports.default = router;