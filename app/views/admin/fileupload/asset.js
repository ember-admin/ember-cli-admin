import Ember from 'ember';
import ConfirmationMixin from 'ember-cli-admin/mixins/views/confirmation';
var assetView;

assetView = Ember.View.extend(ConfirmationMixin, {
  attributeBindings: ["templateName", 'property', 'data-id'],
  classNames: ['asset', 'col-md-2', 'col-xs-4', 'col-lg-2'],
  tagName: 'li',
  'data-id': Ember.computed('asset.id', {
    get() {
      return this.get('asset.id');
    }
  }),
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
  action: Ember.computed({
    get() {
      return {
        title: 'Delete',
        confirm: "Are you sure you want to delete this?",
        action: 'deleteAsset'
      };
    }
  }),
  assetRSVP: Ember.computed('asset', {
    get() {
      return new Ember.RSVP.Promise((function(_this) {
        return function(resolve) {
          return resolve(_this.get('asset'));
        };
      })(this));
    }
  }),
  isImage: Ember.computed('asset.content_type', {
    get() {
      var type = this.get('asset.content_type');
      if (type === 'image/gif' || type === 'image/jpeg' || type === 'image/png' || type === 'image/tiff') {
        return true;
      }
      return false;
    }
  })
});

export default assetView;
