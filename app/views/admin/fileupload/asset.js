import Ember from 'ember';
import ConfirmationMixin from 'ember-cli-admin/mixins/views/confirmation';
var assetView;

assetView = Ember.View.extend(ConfirmationMixin, {
  attributeBindings: ["templateName", 'property'],
  actions: {
    deleteAsset: function() {
      return this._showConfirmation();
    }
  },
  _createConfirmationObject: function(action) {
    return Ember.Object.create({
      actionData: action,
      model: this.get('asset'),
      options: {
        asset: this.get('assetRSVP'),
        single: this.get('parentView.single'),
        property: this.get('property'),
        withOptions: true
      }
    });
  },
  action: (function() {
    return {
      title: 'Delete',
      confirm: "Are you sure you want to delete this?",
      action: 'deleteAsset'
    };
  }).property(),
  assetRSVP: (function() {
    return new Ember.RSVP.Promise((function(_this) {
      return function(resolve) {
        return resolve(_this.get('asset'));
      };
    })(this));
  }).property('asset')
});

export default assetView;