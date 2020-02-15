"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _admin = require("./admin.controllers");

var _admin2 = _interopRequireDefault(_admin);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router(); // api/admin


router.route('/').get(_admin2.default.getAllItems).post(_admin2.default.addItem); // api/admin/:id

router.route('/:id').get(_admin2.default.getOneItem).put(_admin2.default.updateItem).delete(_admin2.default.removeItem);
exports.default = router;