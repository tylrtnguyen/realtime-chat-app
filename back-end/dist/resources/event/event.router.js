"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event = require("./event.controllers");

var _event2 = _interopRequireDefault(_event);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // api/event

router.route('/').get(_event2.default.getAllItems).post(_event2.default.addItem); // api/event/:id

router.route('/:id').get(_event2.default.getOneItem).put(_event2.default.updateItem).delete(_event2.default.removeItem);
exports.default = router;