import Ember from 'ember';
import ConfirmationMixin from 'ember-cli-admin/mixins/views/confirmation';

export default Ember.Component.extend(ConfirmationMixin, {
  classNameBindings: ["class"],
  attributeBindings: ["title"],
  "class": Ember.computed('action', {
    get: function() {
      return this.get('action.class');
    }
  }),
  click: function() {
    let model = this.get('model');
    if (this.get('action.confirm')) {
      return this._showConfirmation();
    } else {
      return this.sendAction(this.get('adminAction'), this.get('action.action'), model);
    }
  },
  actions: {
    confirm: function() {
      var model;
      model = this.get('model');
      this.sendAction(this.get('adminAction'), this.get('action.action'), model);
      return this._super();
    }
  },
  action: Ember.computed('actionName', {
    get: function() {
      if (this.get('breadcrumbAction')) {
        switch (this.get('breadcrumbAction')) {
          case "New":
            return this._findAction('New');
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
        return this.get('actionName');
      }
    }
  }),
  title: Ember.computed('action', {
    get: function() {
      return this.get('action.title');
    }
  }),
  _findAction: function(title) {
    return this.get('allActions').find(function(action) {
      return action.title === title;
    });
  },
  _findAdditionalActions: function(title) {
    return this.get('additionalActions').find(function(action) {
      return action.title === title;
    });
  }
});
