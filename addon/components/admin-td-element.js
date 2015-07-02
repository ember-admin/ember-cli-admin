/*
if you have own attr for display in relation you should change relations property

if you have own image property you should change fileuploads property
*/

import Ember from 'ember';
import Attributes from 'ember-cli-admin/dsl/attributes';
import layout from '../templates/components/admin-td-element';

export default Ember.Component.extend({
  layout: layout,

  attributeBindings: ["style", 'data-column'],

  relations: "name title".w(),
  fileuploads: "thumb_url".w(),

  tagName: "td",

  'data-column': Ember.computed.alias('attributeName'),

  style: Ember.computed('_style', {
    get() {
      let style = Ember.getWithDefault(this, '_style', "");  
      return style.htmlSafe();
    }
  }),

  createObserves: Ember.on('didInsertElement', function() {
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
  }),
  value: Ember.computed("item", {
    get: function() {
      var record;
      record = this.get(this.path());
      if (!record || (!record['get'] || !record.get('id'))) {
        return record;
      }
      return this.relation(record, this.get('attributeName'));
    }
  }),
  image_object: Ember.computed('value', {
    get: function() {
      return this.get("item." + (this.get('attributeName')));
    }
  }),
  color: Ember.computed('value', {
    get: function() {
      if (this.get('attributeName').match(/color/)) {
        this.set('text', true);
        return this.set('_style', `color:${this.get('_value')};`);
      }
    }
  }),
  image: Ember.computed('value', {
    get: function() {
      if (this.get('item.fileuploads') && this.get('item.fileuploads').indexOf(this.get('attributeName')) >= 0) {
        this.set('text', false);
        return true;
      }
    }
  }),
  text: Ember.computed('value', {
    get: function() {
      return true;
    }
  }),
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
      this.get('fileuploads').forEach(attr => {
          if (record.get(attr)) {
            return value = record.get(attr);
          }
      });
    }
    if (Attributes.relations(this.get('item').constructor).indexOf(this.get('attributeName')) >= 0) {
      this.get('relations').forEach(attr => {
          if (record.get(attr)) {
            return value = record.get(attr);
          }
      });
    }
    return value;
  },
  actions: {
    openImagePreview: function() {
      return this.sendAction('adminAction', 'openImagePreview', this.get('image_object.url'));
    }
  },

  itemActions: Ember.computed('allActions', {
    get: function(){
      console.log(this.get('allActions'));
    }
  })
});
