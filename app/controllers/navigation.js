import Ember from 'ember';
import config from '../config/environment';
import Navigation from 'ember-cli-admin/dsl/navigation';
var navigationController;

navigationController = Ember.ArrayController.extend({
  activeMenu: "dashboard",
  model: Navigation.content,
  titleLinksTo: config.EmberENV.titleLinksTo || '/#/',
  siteTitle: config.EmberENV.appName || config.modulePrefix || 'Ember Admin'
});

export default navigationController;
