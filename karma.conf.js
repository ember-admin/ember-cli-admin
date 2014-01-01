module.exports = function(config) {
  config.set({

    files: [
      "vendor/jquery/jquery.min.js",
      "vendor/handlebars/handlebars.js",
      "vendor/ember/ember.js",
      "vendor/ember-data/ember-data.js",
      "vendor/jquery-mockjax/jquery.mockjax.js",
      "dist/ember-admin.min.js",
      "tests/helpers/*.js",
      "tests/test_helper.js",
      "tests/units/**/*.js"
    ],

    logLevel: config.LOG_ERROR,
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
    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
