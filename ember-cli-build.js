/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {});

  return app.toTree();
};
