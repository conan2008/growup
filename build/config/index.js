"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = {
  staticDir: _path2.default.join(__dirname, "..", "assets"),
  viewDir: _path2.default.join(__dirname, "..", "view"),
  port: 8081,
  env: process.env.NODE_ENV //development, production

};

if (process.env.NODE_ENV === 'development') {
  var devConfig = {
    port: 8081
  };
  Object.assign(config, devConfig);
}

if (process.env.NODE_ENV === 'production') {
  var prodConfig = {
    port: 8081
  };
  Object.assign(config, prodConfig);
}

exports.default = config;