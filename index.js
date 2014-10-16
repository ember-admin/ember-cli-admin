module.exports = {
  name: 'ember-cli-admin',

  included: function(app) {
    this.app = app;
    app.import('vendor/app.css')
  }
};