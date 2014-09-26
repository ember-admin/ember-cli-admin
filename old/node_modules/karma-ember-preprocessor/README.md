# karma-ember-preprocessor

> Preprocessor to compile handlebars templates for ember.js on the fly

For more information on Karma see the [homepage].

Requires Karma 0.9+

To use this with karma, first you will need to install it with npm

    npm install karma-ember-preprocessor

Next you need to create a configuration file using karma init


    module.exports = function(karma) {
        karma.set({
            basePath: 'js',

            files: [
              "vendor/jquery/jquery.min.js",
              "vendor/handlebars/handlebars.js",
              "vendor/ember/ember.js",
              "app.js",
              "tests/*.js",
              "templates/*.handlebars"
            ],

            logLevel: karma.LOG_ERROR,
            browsers: ['PhantomJS'],
            singleRun: true,
            autoWatch: false,

            frameworks: ["qunit"],

            plugins: [
                'karma-qunit',
                'karma-chrome-launcher',
                'karma-ember-preprocessor',
                'karma-phantomjs-launcher'
            ],

            preprocessors: {
                "**/*.handlebars": 'ember'
            }
        });
    };


[homepage]: http://karma-runner.github.com

