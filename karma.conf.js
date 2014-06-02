module.exports = function(config) {
  config.set({

    files: [
      "vendor/jquery/jquery.min.js",
      "vendor/handlebars/handlebars.js",
      "vendor/ember.js",
      "vendor/ember-data/ember-data.js",
      "vendor/jquery-mockjax/jquery.mockjax.js",
      "vendor/chance/chance.js",
      "vendor/bootstrap/dist/js/bootstrap.min.js",
      "vendor/bootstrap/dist/css/bootstrap.min.css",
      "dist/ember-admin.min.js",
      "dist/ember-admin.css",
      "tests/helpers/*.js",
      "tests/test_helper.js",
      "tests/units/**/*.js",
      "tests/acceptance/**/*.js"
    ],

    logLevel: config.LOG_ERROR,

    frameworks: ["qunit"],

    plugins: [
      'karma-qunit',
      'karma-ember-preprocessor',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ],

    port: parseInt(process.env.PORT, 10) + 1 || 9876,

    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
