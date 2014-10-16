(function() {
  window.EmberEasyDecorator = Ember.Object.extend(Ember.Evented, Ember.ActionHandler, {
    init: function() {
      return this._super();
    },

    /*
      Returns all attributes from decorator
     */
    attributes: (Ember.computed(function() {
      return Ember.get(this.constructor, 'attributes');
    })).property(),

    /*
      delegate all attributes witch include Value as nomaValue to model
     */
    unknownProperty: function(propertyName) {
      var modelProperty;
      if (/Value$/.test(propertyName)) {
        modelProperty = propertyName.substr(0, propertyName.length - 5);
        return this.get('model.%@'.fmt(modelProperty));
      }
      if (/SectionFields$/.test(propertyName)) {
        return this._createSectionComputed(propertyName);
      }
    },
    _createSectionComputed: function(propertyName) {
      var fields, section;
      section = propertyName.substr(0, propertyName.length - 13);
      console.log(section);
      fields = this.get('attributes').keys.list.filter((function(_this) {
        return function(key) {
          return _this.get('attributes').get(key).options.section === section;
        };
      })(this));
      fields = fields.map((function(_this) {
        return function(field) {
          return _this.get('attributes').get(field);
        };
      })(this));
      fields = this._sort(fields);
      this.set(propertyName, fields);
      return fields;
    },
    _sort: function(array, type) {
      if (type == null) {
        type = 'asc';
      }
      switch (type) {
        case 'asc':
          return array.sort(function(a, b) {
            return a.options.order - b.options.order;
          });
        case 'desc':
          return array.sort(function(a, b) {
            return b.options.order - a.options.order;
          });
      }
    }
  });

  EmberEasyDecorator.reopenClass({
    attributes: Ember.computed(function() {
      var map;
      map = Ember.Map.create();
      this.eachComputedProperty(function(name, meta) {
        if (meta.isAttribute) {
          meta.name = name;
          return map.set(name, meta);
        }
      });
      return map;
    })
  });

  EmberEasyDecorator.element = function(type, options, html) {
    var meta;
    options = options || {};
    html = html || {};
    meta = {
      type: type,
      isAttribute: true,
      html: html,
      options: options
    };
    return Ember.computed(function(key) {
      return this.get('attributes').get(key);
    }).property().meta(meta);
  };

  window.EED = EmberEasyDecorator;

  Ember.Handlebars.helper('decorator-input', function(property, options) {
    var element, _ref;
    options = $.extend({}, options);
    element = this.get('decorator.%@'.fmt(property));
    if ((element != null ? (_ref = element.options) != null ? _ref.isVisible : void 0 : void 0) === false) {
      return;
    }
    $.extend(options.hash, element.html);
    if (element.type === 'nested_attributes') {
      options.hash.templateName = element.options.templateName;
      options.hash.contextBinding = 'controller.decorator';
      options.hash.controllerBinding = 'controller.decorator';
      return Ember.Handlebars.helpers.view.call(this, Ember.View, options);
    }
    options.hash.as = element.type;
    if (element.type === 'select') {
      options.hash.collection = options.hash.collection || 'controller.decorator.%@Collection'.fmt(property);
      if (element.options.relation) {
        options.hash.optionValuePath = options.hash.optionValuePath || "content.id";
        options.hash.optionLabelPath = options.hash.optionLabelPath || "content.value";
      } else {
        options.hash.optionValuePath = options.hash.optionValuePath || "content";
        options.hash.optionLabelPath = options.hash.optionLabelPath || "content";
      }
    }
    return Ember.Handlebars.helpers['input'].call(this, property, options);
  });

  Ember.Handlebars.helper('decorator-section', function(section, options) {
    var elements;
    elements = this.get('decorator.%@SectionFields'.fmt(section));
    return elements.forEach((function(_this) {
      return function(element) {
        options = $.extend({}, options);
        'collection optionValuePath optionLabelPath placeholder value prompt readonly label type'.w().forEach(function(attr) {
          return delete options.hash[attr];
        });
        return Ember.Handlebars.helpers['decorator-input'].call(_this, element.name, options);
      };
    })(this));
  });

}).call(this);
