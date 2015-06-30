'use strict';

var minimist = require('minimist');

var args = minimist(process.argv.slice(2), {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'dev'}
});

module.exports = args;