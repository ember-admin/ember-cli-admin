import Ember from 'ember';

export default Ember.Checkbox.extend({
	isChecked: function(){
		var attr = this.get('attribute');
		var isChecked = Ember.tryInvoke(this.get('controller'), 'isActive',
		 [attr]);
		this.set('checked', isChecked);
	}.on('init'),

	click: function(e){
		var attr = this.get('attribute');
		Ember.tryInvoke(this.get('controller'), 'isActive', [attr,
			this.get('checked')]);
	}
});