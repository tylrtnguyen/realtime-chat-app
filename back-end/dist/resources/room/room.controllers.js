"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crud = require("../../utils/crud");

var _room = require("./room.model");

exports.default = (0, _crud.crudControllers)(_room.Room);