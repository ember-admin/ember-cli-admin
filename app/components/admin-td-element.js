/*
if you have own attr for display in relation you should change relations property

if you have own image property you should change fileuploads property
*/

import Ember from 'ember';
import Attributes from 'ember-cli-admin/dsl/attributes';
var tdComponent;

tdComponent = Ember.Component.extend({
  attributeBindings: ["style", 'data-column'],
  relations: "name title".w(),
  fileuploads: "thumb_url".w(),
  tagName: "td",
  'data-column': Ember.computed.alias('attributeName'),
  createObserves: (function() {
    if (this.get('item.fileuploads') && this.get('item.fileuploads').indexOf(this.get('attributeName')) >= 0) {
      this.get('fileuploads').forEach((function(_this) {
        return function(attr) {
          return _this.addObserver("item." + (_this.get('attributeName')) + "." + attr, function() {
            return this.notifyPropertyChange("value");
          });
        };
      })(this));
      return;
    }
    if (Attributes.relations(this.get('item').constructor).indexOf(this.get('attributeName')) >= 0) {
      this.get('relations').forEach((function(_this) {
        return function(attr) {
          return _this.addObserver("item." + (_this.get('attributeName')) + "." + attr, _this, function() {
            return this.notifyPropertyChange("value");
          });
        };
      })(this));
      return;
    }
    return this.addObserver("item." + (this.get('attributeName')), this, function() {
      return this.notifyPropertyChange("value");
    });
  }).on('didInsertElement'),
  value: (function() {
    var record;
    record = this.get(this.path());
    if (!record || (!record['get'] || !record.get('id'))) {
      return record;
    }
    return this.relation(record, this.get('attributeName'));
  }).property("item"),
  image_object: (function() {
    return this.get("item." + (this.get('attributeName')));
  }).property('value'),
  color: (function() {
    if (this.get('attributeName').match(/color/)) {
      this.set('text', true);
      return this.set('style', "color: " + (this.get('_value')) + ";");
    }
  }).property('value'),
  image: (function() {
    if (this.get('item.fileuploads') && this.get('item.fileuploads').indexOf(this.get('attributeName')) >= 0) {
      this.set('text', false);
      return true;
    }
  }).property('value'),
  text: (function() {
    return true;
  }).property('value'),
  path: function() {
    return "item.%@".fmt(this.get('attributeName'));
  },
  relation: function(record) {
    var value;
    if (!record) {
      return;
    }
    value = "";
    if (this.get('item.fileuploads') && this.get('item.fileuploads').indexOf(this.get('attributeName')) >= 0) {
      this.get('fileuploads').forEach((function(_this) {
        return function(attr) {
          if (record.get(attr)) {
            return value = record.get(attr);
          }
        };
      })(this));
    }
    if (Attributes.relations(this.get('item').constructor).indexOf(this.get('attributeName')) >= 0) {
      this.get('relations').forEach((function(_this) {
        return function(attr) {
          if (record.get(attr)) {
            return value = record.get(attr);
          }
        };
      })(this));
    }
    return value;
  },
  actions: {
    openImagePreview: function() {
      return this.sendAction('adminAction', 'openImagePreview', this.get('image_object.url'));
    }
  }
});

export default tdComponent;
