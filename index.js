module.exports = {
  name: 'ember-cli-admin',

  included: function(app) {
    this.app = app;
    app.import('vendor/app.css');
    app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');
    app.import('bower_components/typeahead.js/dist/bloodhound.min.js');
    app.import('bower_components/typeahead.js/dist/typeahead.jquery.js');
    app.import('bower_components/jquery-ui-sortable/jquery-ui-sortable.js');
    app.import('vendor/nested-sortable.js');
  }
};