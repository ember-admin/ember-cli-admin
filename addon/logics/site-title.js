import Ember from 'ember';
var siteTitle;

siteTitle = Ember.Object.extend();

siteTitle.reopenClass({
  setup: function(controllerName, model, action) {
    if (action) {
      if (model.get('id')) {
        return document.title = `${controllerName} - ${model.get('id')} - ${action}`;
      } else {
        return document.title = `${controllerName} - ${action}`;
      }
    } else {
      return document.title = `${controllerName} - list`;
    }
  }
});

export default siteTitle;
