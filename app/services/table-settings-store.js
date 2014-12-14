import Ember from 'ember';

export default Ember.Object.extend({
	persistence: window.localStorage,

	namespace: 'table-settings-store',

	unknownProperty: function(key){
		var namespacedKey = this._key(key);
		var payload = this.get('persistence').getItem(namespacedKey);
		return this._deserialize(payload);
	},

	setUnknownProperty: function(key, value){
		var namespacedKey = this._key(key);
		var payload = this._serialize(value);
		this.get('persistence').setItem(namespacedKey, payload);
		return true;
	},

	removeItem: function(key){
		this.get('persistence').removeItem(this._key(key));
	},

	_serialize: function(value){
		return JSON.stringify(value);
	},

	_deserialize: function(value){
		return JSON.parse(value);
	},

	_key: function(key){
		return "%@:%@".fmt(this.get('namespace'), key);
	}
});