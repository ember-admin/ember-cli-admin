import Ember from 'ember';

export default {
	name: 'table-settings-store-service',

	initialize: function(container, app){
		app.inject('controller', 'tableSettingsStore',
		 'service:table-settings-store');
	}
};