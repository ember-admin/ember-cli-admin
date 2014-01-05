module.exports = {
  options: {
    configFile: 'karma.conf.js',
    reporters: ['coverage', 'dots'],
    plugins: [
      'karma-qunit',
      'karma-ember-preprocessor',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ]
  },
  ci: {
    singleRun: true,
  },
  dev: {
    autoWatch: true,
    singleRun: false
  },
  server: {
    background: true,
    coverageReporter: {
      type : ['html'],
      dir : 'coverage/'
    }
  },
  browsers: {
    singleRun: true,
    plugins: [
      'karma-qunit',
      'karma-ember-preprocessor',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],
    browsers: [
      'Chrome',
      'Firefox',
      'PhantomJS'
    ]
  }
};
