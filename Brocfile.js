/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon();
//app.import('vendor/ember-easy-decorator.js');
//app.import('vendor/ember-easyForm.js');
//app.import('bower_components/ember-forms/dist/globals/main.js');
//app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');
app.import('bower_components/chance/chance.js');

// Put the bootstrap fonts in the place that the bootstrap css expects to find them.

var pickFiles = require('broccoli-static-compiler');
var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: '/assets/bootstrap'
});

var compileSass = require('broccoli-sass');
var mainCss = compileSass(['app/styles'], 'app.scss', 'assets/dummy.css');

var mergeTrees = require('broccoli-merge-trees');

module.exports = mergeTrees([app.toTree(), bootstrapFonts, mainCss], {
	overwrite: true
});
