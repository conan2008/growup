"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dns = require("dns");

let UserService = class UserService {
  getData(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Hello UserAction ${id}`);
      }, 1000);
    });
  }

};
exports.default = UserService;