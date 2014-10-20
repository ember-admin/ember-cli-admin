module.exports = {
  name: 'ember-cli-admin',

  included: function(app) {
    this.app = app;
    //app.import('vendor/app.css');
    app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');
  }
};