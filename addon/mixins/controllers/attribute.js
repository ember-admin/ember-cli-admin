import Ember from 'ember';

export default Ember.Mixin.create({
	isActive: function(key, value){
		var model = this.model;
		var modelType = this._getModelType();
		var hiddenAttributes = this.tableSettingsStore.get(modelType);
		var isHidden = hiddenAttributes.some(function(attr){
				return attr === model;
			});

		if (value === undefined){
			return !isHidden;
		} else {
			if (isHidden){
				hiddenAttributes.splice(hiddenAttributes.indexOf(model), 1);
			} else {
				hiddenAttributes.push(model);
			}
			this.tableSettingsStore.set(modelType, hiddenAttributes);
			this._setActiveAttributes(hiddenAttributes, {async: true});	
			return value;			
		}
	}.property(),

	_getModelType: function(){
		return this.get('parentController').model.modelType.toString().match(/:([^:]+)/)[1];
	},

	_setActiveAttributes: function(hiddenAttributes, options){
		var attributes = this.get('parentController')
		.get('tableAttributes');
		var activeAttributes = attributes.filter(function(attr){
	      return !hiddenAttributes.some(function(hiddenAttr){
	        return hiddenAttr === attr;
	      });
	    });

		if (options && options.async){
			window.setTimeout((function(_this){
				return function(){
					_this.get('parentController')
					.set('activeTableAttributes', activeAttributes);	
				}
			})(this), 0);
		} else {
			this.get('parentController').set('activeTableAttributes', activeAttributes);
		}
	}
});