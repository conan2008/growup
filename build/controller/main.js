"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _indexController = require("./indexController");

var _indexController2 = _interopRequireDefault(_indexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mainController = {
  init() {
    return new _koaRouter2.default().get('/', _indexController2.default.homeAction()).get('/model', _indexController2.default.modelAction());
  }

};
exports.default = mainController;