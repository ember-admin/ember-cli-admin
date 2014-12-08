import Ember from 'ember';

export default {
	name: 'some name',

	initialize: function(container, app){
		app.inject('route', 'tableSettingsStore',
		 'service:table-settings-store');
		app.inject('controller', 'tableSettingsStore',
		 'service:table-settings-store');
	}
};