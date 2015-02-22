import Ember from 'ember';
import ConfirmationMixin from 'ember-cli-admin/mixins/views/confirmation';
var assetView;

assetView = Ember.View.extend(ConfirmationMixin, {
    attributeBindings: ["templateName", 'property', 'data-id'],
    classNames: ['asset', 'col-md-2', 'col-xs-4', 'col-lg-2'],
    tagName: 'li',
    'data-id': function(){
        return this.get('asset.id');
    }.property('asset.id'),
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
    }).property('asset'),
    isImage: function(){
        var type = this.get('asset.content_type');
        if(type === 'image/gif' || type === 'image/jpeg' || type === 'image/png' || type === 'image/tiff') {
            return true;
        }
        return false;
    }.property('asset.content_type')
});

export default assetView;
