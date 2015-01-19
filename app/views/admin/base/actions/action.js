import Ember from 'ember';
import ConfirmationMixin from 'ember-cli-admin/mixins/views/confirmation';
var actionView;

actionView = Ember.View.extend(ConfirmationMixin, {
  classNameBindings: ["class"],
  attributeBindings: ["title"],
  "class": (function() {
    return this.get('action.class');
  }).property('action'),
  click: function() {
    var model;
    model = this.get('model') || this.get('controller.model');
    if (this.get('action.confirm')) {
      return this._showConfirmation();
    } else {
      return this.get('controller').send('adminAction', this.get('action.action'), model);
    }
  },
  actions: {
    confirm: function() {
      var model;
      model = this.get('model') || this.get('controller.model');
      this.get('controller').send(this.get('adminAction', 'action.action'), model);
      return this._super();
    }
  },
  action: (function() {
    if (this.get('breadcrumbAction')) {
      switch (this.get('breadcrumbAction')) {
        case "New":
          return this.get('controller.actionNew');
        case "Edit":
          return this._findAction('Edit');
        case "Destroy":
          return this._findAction('Delete');
        case "Show":
          return this._findAction('Show');
        default:
          return "";
      }
    } else {
      return this.get('context');
    }
  }).property('context'),
  title: (function() {
    return this.get('action.title');
  }).property('action'),
  _findAction: function(title) {
    return this.get('controller.itemActions').find(function(action) {
      return action.title === title;
    });
  },
  _findAdditionalActions: function(title) {
    return this.get('controller.additionalActions').find(function(action) {
      return action.title === title;
    });
  }
});

export default actionView;