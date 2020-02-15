"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginValidation = exports.registerValidation = undefined;

var _joi = require("@hapi/joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerValidation = exports.registerValidation = userInput => {
  const schema = _joi2.default.object({
    name: _joi2.default.string().min(6).required(),
    email: _joi2.default.string().min(8).required().email(),
    password: _joi2.default.string().min(8).required()
  });

  return schema.validate(userInput);
};

const loginValidation = exports.loginValidation = userInput => {
  const schema = _joi2.default.object({
    email: _joi2.default.string().min(8).required().email(),
    password: _joi2.default.string().min(8).required()
  });

  return schema.validate(userInput);
};