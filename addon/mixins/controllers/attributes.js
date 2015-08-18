import Ember from 'ember';
import Attributes from 'ember-cli-admin/dsl/attributes';

export default Ember.Mixin.create({
  formAttributes: Ember.computed('modelAttributes.[]', {
    get: function() {
      return Attributes.withoutId(this.get("model").constructor);
    }
  }),

  showAttributes: Ember.computed('modelAttributes.[]', {
    get: function(){
      return Attributes.withoutId(this.get("model").constructor);
    }
  }),

  tableAttributes: Ember.computed('modelAttributes.[]', {
    get: function() {
      return this.get('modelAttributes');
    }
  }),

  fileuploads: Ember.computed('model.fileuploads', {
    get: function() {
      if (this.get('model.fileuploads')) {
        return this.get('model.fileuploads');
      }
    }
  }),

  activeTableAttributes: Ember.computed({
    get: function() {
      let type = this.toString().match(/:([^:]+)/)[1];
      let hiddenAttributes = this.tableSettingsStore.get(type) || Ember.A();
      let attributes = this.get('tableAttributes');
      let returnValue = attributes.filter(function(attr) {
        return !hiddenAttributes.some(function(hiddenAttr) {
          return hiddenAttr === attr;
        });
      });
      return returnValue;
    }
  }),

  isActive: function(attribute, value) {
    var model = attribute;
    var currentController = this.get('_name');
    var hiddenAttributes = this.tableSettingsStore.get(currentController) || Ember.A();
    var isHidden = hiddenAttributes.some(function(attr) {
      return attr === model;
    });

    if (value === undefined) {
      return !isHidden;
    } else {
      if (isHidden) {
        hiddenAttributes.splice(hiddenAttributes.indexOf(model), 1);
      } else {
        hiddenAttributes.push(model);
      }
      this.tableSettingsStore.set(currentController, hiddenAttributes);
      this._setActiveAttributes(hiddenAttributes, {
        async: true
      });
      return value;
    }
  },

  _setActiveAttributes: function(hiddenAttributes, options) {
    var attributes = this.get('tableAttributes');
    var activeAttributes = attributes.filter(function(attr) {
      return !hiddenAttributes.some(function(hiddenAttr) {
        return hiddenAttr === attr;
      });
    });

    if (options && options.async) {
      window.setTimeout((function(_this) {
        return function() {
          _this.set('activeTableAttributes', activeAttributes);
        };
      })(this), 0);
    } else {
      this.set('activeTableAttributes', activeAttributes);
    }
  },

  actions: {
    openModalSettings: function() {
      this.send('openModal', Ember.Object.extend({}),
        'admin.base.filter-columns-modal');
    }
  }

});
