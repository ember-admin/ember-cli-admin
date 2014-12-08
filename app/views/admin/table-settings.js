import Ember from 'ember';

export default Ember.View.extend({
	tagName: 'li',

	click: function(e){
		var modelObject = Ember.Object.extend({});
		var modalTemplate = 'admin.base.table-settings-modal';
		
		e.preventDefault();
		
		this.get('controller').send('openModal', modelObject, modalTemplate);
	}
});