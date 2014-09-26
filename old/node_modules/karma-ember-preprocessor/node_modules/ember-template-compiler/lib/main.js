(function() {

  var fs = require('fs');
  var path = require('path');

  var vendor = path.join(path.dirname(fs.realpathSync(__filename)), '../vendor');
  var compiler = require(vendor + '/ember-template-compiler.js', 'utf8');

  module.exports = compiler;

}).call(this);
