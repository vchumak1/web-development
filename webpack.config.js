'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: '/Food/src/js/main.js',
  output: {
    filename: 'main.js',
    path: __dirname + '/Food/dist/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
