'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stage = process.env.NODE_ENV || 'development';

/**
 * Creates instance of sequelize instance
 */
exports.default = new _sequelize2.default(_config2.default[stage].database, _config2.default[stage].username, _config2.default[stage].password, {
    host: _config2.default[stage].host,
    dialect: _config2.default[stage].dialect,
    operatorsAliases: true,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
