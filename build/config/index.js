'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));

let config = {
    staticDir: path.join(__dirname, "..", "assets"),
    viewDir: path.join(__dirname, "..", "view"),
    env: "production" //development, production
};

{

    var prodConfig = {
        port: 8081
    };

    Object.assign(config,prodConfig);
}

module.exports = config;
