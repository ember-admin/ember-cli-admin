import Ember from 'ember';
import AdminResolver from 'ember-cli-admin/admin-resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: AdminResolver
});

loadInitializers(App, config.modulePrefix);

export default App;
