"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crud = require("../../utils/crud");

var _event = require("./event.model");

exports.default = (0, _crud.crudControllers)(_event.Event);