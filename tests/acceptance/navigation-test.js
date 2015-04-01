import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Navigation', {
    beforeEach: function(){
        App = startApp();
    },
    afterEach: function(){
        Ember.run(App, 'destroy');
    }
});

test('navigation bar title displays application name', function(assert) {
    assert.expect(1);
    visit('/');

    andThen(function(){
        assert.equal(find('.navbar-brand').text(), 'Sample App Name');
    });
});

test('title link points to destination provided via config file', function(assert) {
    assert.expect(1);
    visit('/');

    andThen(function(){
        assert.equal(find('.navbar-brand').attr('href'), '/example/url');
    });
});
