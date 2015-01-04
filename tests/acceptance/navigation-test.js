import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Navigation', {
	setup: function(){
		App = startApp();
	},
	teardown: function(){
		Ember.run(App, 'destroy');
	}
});

test('navigation bar title displays application name', function(){
	expect(1);
	visit('/');

	andThen(function(){
		equal(find('.navbar-brand').text(), 'Sample App Name');
	});
});

test('title link points to destination provided via config file', function(){
	expect(1);
	visit('/');

	andThen(function(){
		equal(find('.navbar-brand').attr('href'), '/example/url');
	});
});