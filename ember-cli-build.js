/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: '/assets/bootstrap'
  });

  return mergeTrees([app.toTree(), bootstrapFonts], {
    overwrite: true
  });
};
