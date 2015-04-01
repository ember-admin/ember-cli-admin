import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';

export default function startApp(attrs) {
  var App;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Router.reopen({
    // Using 'hash' allows us to properly test window.history actions
    location: 'hash'
  });

  Ember.run(function() {
    App = Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  return App;
}
