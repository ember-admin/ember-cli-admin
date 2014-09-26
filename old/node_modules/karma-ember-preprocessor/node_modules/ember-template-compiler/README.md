
An npm module for the ember-template-compiler.js file that ships with ember.js

##What can I do with this?

If you have a client build process and need to compile handlebars templates for ember.js

    npm install ember-template-compiler

    var compiler = require('ember-template-compiler');
    var template = fs.readFileSync('foo.handlebars').toString();
    var input = compiler.precompile(template).toString();
    var output = "Ember.TEMPLATES['foo'] = Ember.Handlebars.template(" + input + ");";

##Handlebars Version

This package will utilize any recent Handlebars version. To require a specific version
simply specify it in your `package.json`. By default the latest 1.x version will be used.

##Development

To run the tests

    npm test

## License

Copyright © 2013 Toran Billups

Licensed under the MIT License
