/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon();
app.import('vendor/ember-easy-decorator.js');
app.import('vendor/ember-easyForm.js');
app.import('bower_components/ember-forms/dist/globals/main.js');
app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');


// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// module.exports = app.toTree();

// Put the bootstrap fonts in the place that the bootstrap css expects to find them.
var pickFiles = require('broccoli-static-compiler');
var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: '/assets/bootstrap'
});

var compileSass = require('broccoli-sass');
var adminCss   = compileSass(['app/styles'], 'app.scss',  'assets/vendor.css');


// Merge the bootstrapFonts with the ember app tree
var mergeTrees = require('broccoli-merge-trees');
module.exports = mergeTrees([app.toTree(),bootstrapFonts, adminCss], { overwrite: true });
