"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crud = require("../../utils/crud");

var _user = require("./user.model");

exports.default = (0, _crud.crudControllers)(_user.User);