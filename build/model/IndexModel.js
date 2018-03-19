"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dns = require("dns");

class Index {
  constructor() {}

  getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello action&model!");
      }, 1000);
    });
  }

}

exports.default = Index;