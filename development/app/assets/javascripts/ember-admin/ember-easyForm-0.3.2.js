// Last commit: bbb9ad3 (2013-05-30 21:02:34 -0400)


(function() {
    Ember.EasyForm = Ember.Namespace.create({
        VERSION: '0.3.2'
    });

})();



(function() {
    Ember.EasyForm.Config = Ember.Namespace.create({
        _wrappers: {
            'default': {
                formClass: '',
                fieldErrorClass: 'fieldWithErrors',
                inputClass: 'input',
                errorClass: 'error',
                hintClass: 'hint',
                labelClass: '',
                wrapControls: false,
                controlsWrapperClass: ''
            }
        },
        _inputTypes: {},
        registerWrapper: function(name, wrapper) {
            this._wrappers[name] = Ember.$.extend({}, this._wrappers['default'], wrapper);
        },
        getWrapper: function(name) {
            var wrapper = this._wrappers[name];
            Ember.assert("The wrapper '" + name + "' was not registered.", wrapper);
            return wrapper;
        },
        registerInputType: function(name, type){
            this._inputTypes[name] = type;
        },
        getInputType: function(name) {
            return this._inputTypes[name];
        }
    });
})();



(function() {
    Ember.Handlebars.registerHelper('errorField', function(property, options) {
        if (this.get('errors')) {
            options.hash.property = property;
            return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Error, options);
        }
    });

})();



(function() {
    Ember.Handlebars.registerHelper('formFor', function(object, options) {
        options.hash.contentBinding = object;
        return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Form, options);
    });

})();



(function() {
    Ember.Handlebars.registerHelper('hintField', function(text, options) {
        if (options.hash.text){
            return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Hint, options);
        }
    });
})();


(function() {
    Ember.Handlebars.registerHelper('labelField', function(property, options) {
        options.hash.property = property;
        options.hash.viewName = 'labelField-'+options.data.view.elementId;
        return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Label, options);
    });

})();



(function() {
    Ember.Handlebars.registerHelper('submit', function(value, options) {
        if (typeof(value) === 'object') {
            options = value;
            value = undefined;
        }
        options.hash.context = this;
        options.hash.value = value || 'Submit';
        return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Submit, options);
    });

})();



(function() {

})();



(function() {
    Ember.EasyForm.BaseView = Ember.View.extend({
        getWrapperConfig: function(configName) {
            var wrapper = Ember.EasyForm.Config.getWrapper(this.get('wrapper'));
            return wrapper[configName];
        },
        wrapper: Ember.computed(function() {
            // Find the first parent with 'wrapper' defined.
            var parentView = this.get('parentView');
            while(parentView){
                var config = parentView.get('wrapper');
                if (config) return config;
                parentView = parentView.get('parentView');
            }

            return 'default';
        })
    });
})();



(function() {
    Ember.EasyForm.Checkbox = Ember.Checkbox.extend();

})();



(function() {
    Ember.EasyForm.Error = Ember.EasyForm.BaseView.extend({
        tagName: 'span',
        init: function() {
            var watchFunc;
            this._super();

            this.classNames.push(this.getWrapperConfig('errorClass'));

            // TODO: un-fuglify this
            watchFunc = {};
            watchFunc[''+this.property+'Watch'] = function() {
                if (typeof(this.get('controller.errors.'+this.property)) === 'string') {
                    return (this.get('controller.errors.'+this.property));
                } else {
                    return (this.get('controller.errors.'+this.property) || [])[0];
                }
            }.property('controller.errors.'+this.property);
            this.reopen(watchFunc);

            this.set('template', Ember.Handlebars.compile('{{view.'+this.property+'Watch}}'));
        }
    });

})();



(function() {
    Ember.EasyForm.Form = Ember.EasyForm.BaseView.extend({
        tagName: 'form',
        attributeBindings: ['novalidate'],
        novalidate: 'novalidate',
        wrapper: 'default',
        init: function() {
            this._super();
            this.classNames.push(this.getWrapperConfig('formClass'));
        },
        submit: function(event) {
            var _this = this, promise;

            if (event) {
                event.preventDefault();
            }

            if (Ember.isNone(this.get('context.validate'))) {
                this.get('controller').send('submit');
            } else {
                if (!Ember.isNone(this.get('context').validate)) {
                    promise = this.get('context').validate();
                } else {
                    promise = this.get('context.content').validate();
                }
                promise.then(function() {
                    if (_this.get('context.isValid') === true) {
                        _this.get('controller').send('submit');
                    }
                });
            }
        }
    });

})();



(function() {
    Ember.EasyForm.Hint = Ember.EasyForm.BaseView.extend({
        tagName: 'span',
        init: function() {
            this._super();
            this.classNames.push(this.getWrapperConfig('hintClass'));
            this.set('template', Ember.Handlebars.compile(this.get('text')));
        }
    });
})();



(function() {
    Ember.EasyForm.Input = Ember.EasyForm.BaseView.extend({
        init: function() {
            this._super();
            this.classNameBindings.push('error:' + this.getWrapperConfig('fieldErrorClass'));
            this.classNames.push(this.getWrapperConfig('inputClass'));
            if (!this.isBlock) {
                this.set('template', Ember.Handlebars.compile(this.fieldsForInput()));
            }
            if (!Ember.isNone(this.get('context.errors'))) {
                this.reopen({
                    error: function() {
                        return this.get('context').get('errors').get(this.property) !== undefined;
                    }.property('context.errors.'+this.property)
                });
            }
        },
        tagName: 'div',
        classNames: ['string'],
        didInsertElement: function() {
            this.set('labelField-'+this.elementId+'.for', this.get('inputField-'+this.elementId+'.elementId'));
        },
        concatenatedProperties: ['inputOptions'],
        inputOptions: ['as', 'placeholder', 'inputConfig', 'collection', 'prompt', 'optionValuePath', 'optionLabelPath', 'selection', 'value'],
        fieldsForInput: function() {
            return this.labelField() +
                this.wrapControls(
                    this.inputField() +
                        this.errorField() +
                        this.hintField()
                );
        },
        labelField: function() {
            var options = this.label ? 'text="'+this.label+'"' : '';
            return '{{labelField '+this.property+' '+options+'}}';
        },
        inputField: function() {
            var options = '', key, inputOptions = this.inputOptions;
            for (var i = 0; i < inputOptions.length; i++) {
                key = inputOptions[i];
                if (this[key]) {
                    if (typeof(this[key]) === 'boolean') {
                        this[key] = key;
                    }
                    options = options.concat(''+key+'="'+this[inputOptions[i]]+'"');
                }
            }

            options.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

            return '{{inputField '+this.property+' '+options+'}}';
        },
        errorField: function() {
            var options = '';
            return '{{#if errors.' + this.property + '}}{{errorField '+this.property+' '+options+'}}{{/if}}';
        },
        hintField: function() {
            var options = this.hint ? 'text="'+this.hint+'"' : '';
            return '{{hintField '+this.property+' '+options+'}}';
        },
        wrapControls: function(controls) {
            if (this.getWrapperConfig('wrapControls')) {
                return '<div class="' + this.getWrapperConfig('controlsWrapperClass') + '">' +
                    controls +
                    '</div>';
            } else {
                return controls;
            }
        },
        focusOut: function() {
            if (!Ember.isNone(this.get('context.validate'))) {
                if (!Ember.isNone(this.get('context').validate)) {
                    this.get('context').validate(this.property);
                } else {
                    this.get('context.content').validate(this.property);
                }
            }
        }
    });

})();



(function() {
    Ember.EasyForm.Label = Ember.EasyForm.BaseView.extend({
        tagName: 'label',
        attributeBindings: ['for'],
        init: function() {
            this._super();
            this.classNames.push(this.getWrapperConfig('labelClass'));
            this.set('template', this.renderText());
        },
        renderText: function() {
            return Ember.Handlebars.compile(this.text || this.property.underscore().split('_').join(' ').capitalize());
        }
    });

})();



(function() {
    Ember.EasyForm.TextArea = Ember.TextArea.extend();

})();



(function() {
    Ember.EasyForm.TextField = Ember.TextField.extend();

})();



(function() {

})();



(function() {
    Ember.TEMPLATES['easyForm/input'] = Ember.Handlebars.compile('<label {{bindAttr for="labelFor"}}>{{labelText}}</label>');

})();



(function() {

})();



(function() {
    Ember.EasyForm.objectNameFor = function(object) {
        var constructorArray = object.constructor.toString().split('.');
        return constructorArray[constructorArray.length - 1].underscore();
    };

})();



(function() {

})();



