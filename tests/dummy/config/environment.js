/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    podModulePrefix: 'dummy/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    /**
    Used for redirection from dashboard to the setted route. Optional property.
    @property redirectFromDashboardTo
    @type {string}
    **/
    redirectFromDashboardTo : 'users',
    EmberENV: {
      appName: 'Sample App Name',
      titleLinksTo: '/example/url',
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' use.typekit.net http://connect.facebook.net *.googleapis.com " +
        "*.gstatic.com *.yandex.ru http://localhost:3000  https://maps.googleapis.com https://maps.gstatic.com",
      'style-src': "'self' 'unsafe-inline' use.typekit.net *.googleapis.com http://localhost:3000 http://facebook.com",
      'img-src': "*",
      'font-src': "'self' *.gstatic.com",
      'connect-src': "'self' ws://localhost:35729 ws://0.0.0.0:35729 http://localhost:3000",
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
